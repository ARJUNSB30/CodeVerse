import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { AutosaveComponent } from '../autosave/autosave.component';

@Component({
  selector: 'app-common-from',
  standalone: false,
  templateUrl: './common-from.component.html',
  styleUrls: ['./common-from.component.css']
})
export class CommonFromComponent implements OnInit, OnDestroy {
  @Input() formType: string = '';
  @ViewChild('autosaveComponent') autosaveComponent!: AutosaveComponent;

  form: FormGroup;
  formData: any;
  autosaveEnabled: boolean = true;
  private autosaveTimer: any;
  private readonly AUTOSAVE_DELAY = 2000; // 2 seconds

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    if (this.formType) {
      this.loadFormData();
    }
  }

  ngOnChanges() {
    if (this.formType) {
      this.loadFormData();
    }
  }

  loadFormData() {
    this.formService.getFormData(this.formType).subscribe(data => {
      this.formData = data;
      this.createForm();
    });
  }

  createForm() {
    this.form = this.fb.group({});
    
    if (!this.formData || !this.formData.fields) return;

    this.formData.fields.forEach((field: any) => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      
      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }
      
      this.form.addControl(field.name, this.fb.control(field.defaultValue || '', validators));
    });

    this.form.valueChanges.subscribe((formValue) => {
      if (this.autosaveEnabled && this.hasFormData(formValue)) {
        this.scheduleAutosave(formValue);
      }
    });
  }

  onAutosaveToggle(enabled: boolean) {
    this.autosaveEnabled = enabled;
    if (!enabled && this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }
    console.log('Autosave is now:', enabled ? 'enabled' : 'disabled');
  }

  onRestoreDataRequested(savedData: any) {
    if (savedData && this.form) {
     
      try {
        this.form.patchValue(savedData);
        console.log('Form data restored successfully');
        
        this.showNotification('Your previous form data has been restored!', 'success');
      } catch (error) {
        console.error('Error restoring form data:', error);
        this.showNotification('Failed to restore form data', 'error');
      }
    }
  }

  private scheduleAutosave(formValue: any) {
    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }
    
    this.autosaveTimer = setTimeout(() => {
      this.performAutosave(formValue);
    }, this.AUTOSAVE_DELAY);
  }
  private performAutosave(formValue: any) {
    if (this.autosaveEnabled && this.autosaveComponent && this.hasFormData(formValue)) {
      this.autosaveComponent.saveFormData(formValue);
      console.log('Auto-saved form data');
    }
  }

  public hasFormData(formValue: any): boolean {
    if (!formValue) return false;
    return Object.values(formValue).some(value => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    });
  }
  submitForm() {
    if (!this.form.valid) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }
  
    this.formService.submitFormData(this.formType, this.form.value).subscribe({
      next: (response) => {
        if (this.autosaveComponent) {
          this.autosaveComponent.clearSavedData();
        }
        
        this.form.reset();
        this.showNotification('Form submitted successfully!', 'success');
        console.log('Form submitted successfully:', response);
      },
      error: (error) => {
        console.error('Form submission error:', error);
        this.showNotification('Failed to submit form. Your data is still saved.', 'error');
      }
    });
  }

  saveProgress() {
    if (this.hasFormData(this.form.value) && this.autosaveComponent) {
      this.autosaveComponent.saveFormData(this.form.value);
      this.showNotification('Progress saved!', 'success');
    } else {
      this.showNotification('No data to save', 'warning');
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'warning') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: white;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
    `;
    
    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#4caf50';
        break;
      case 'error':
        notification.style.backgroundColor = '#f44336';
        break;
      case 'warning':
        notification.style.backgroundColor = '#ff9800';
        break;
    }
    
    document.body.appendChild(notification);
   
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  ngOnDestroy() {
    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }
  }
}