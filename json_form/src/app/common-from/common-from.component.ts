// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormService } from '../form.service';


// @Component({
//   selector: 'app-common-from',
//   standalone: false,
//   templateUrl: './common-from.component.html',
//   styleUrls: ['./common-from.component.css']
// })
// export class CommonFromComponent implements OnInit {
//   @Input() formType: string = '';

//   form: FormGroup;
//   formData: any;

//   constructor(private fb: FormBuilder, private formService: FormService) {
//     this.form = this.fb.group({});
//   }

//   ngOnInit() {
//     if (this.formType) {
//       this.loadFormData();
//     }
//   }

//   ngOnChanges() {
//     if (this.formType) {
//       this.loadFormData();
//     }
//   }

//   loadFormData() {
//     this.formService.getFormData(this.formType).subscribe(data => {
//       this.formData = data;
//       this.createForm();
//     });
//   }

//   createForm() {
  
//     this.form = this.fb.group({});
    
//     if (!this.formData || !this.formData.fields) return;

//     this.formData.fields.forEach((field: any) => {
//       const validators = [];
      
//       if (field.required) {
//         validators.push(Validators.required);
//       }
      
//       if (field.type === 'email') {
//         validators.push(Validators.email);
//       }
      
//       if (field.minLength) {
//         validators.push(Validators.minLength(field.minLength));
//       }
      
//       this.form.addControl(field.name, this.fb.control(field.defaultValue || '', validators));
//     });
//   }

//   submitForm() {
//     if (!this.form.valid) return;
  
//     this.formService.submitFormData(this.formType, this.form.value).subscribe({
//       next: () => this.form.reset(),
//       error: console.error
//     });
//   }
// }
  

    

// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormService } from '../form.service';

// @Component({
//   selector: 'app-common-from',
//   standalone: false,
//   templateUrl: './common-from.component.html',
//   styleUrls: ['./common-from.component.css']
// })
// export class CommonFromComponent implements OnInit {
//   @Input() formType: string = '';

//   form: FormGroup;
//   formData: any;
//   autosaveEnabled: boolean = true; // Add autosave state
//   private autosaveTimer: any; // Timer for autosave functionality

//   constructor(private fb: FormBuilder, private formService: FormService) {
//     this.form = this.fb.group({});
//   }

//   ngOnInit() {
//     if (this.formType) {
//       this.loadFormData();
//     }
//   }

//   ngOnChanges() {
//     if (this.formType) {
//       this.loadFormData();
//     }
//   }

//   loadFormData() {
//     this.formService.getFormData(this.formType).subscribe(data => {
//       this.formData = data;
//       this.createForm();
//     });
//   }

//   createForm() {
//     this.form = this.fb.group({});
    
//     if (!this.formData || !this.formData.fields) return;

//     this.formData.fields.forEach((field: any) => {
//       const validators = [];
      
//       if (field.required) {
//         validators.push(Validators.required);
//       }
      
//       if (field.type === 'email') {
//         validators.push(Validators.email);
//       }
      
//       if (field.minLength) {
//         validators.push(Validators.minLength(field.minLength));
//       }
      
//       this.form.addControl(field.name, this.fb.control(field.defaultValue || '', validators));
//     });

//     // Subscribe to form changes for autosave
//     this.form.valueChanges.subscribe(() => {
//       if (this.autosaveEnabled) {
//         this.scheduleAutosave();
//       }
//     });
//   }

//   // Handle autosave toggle change
//   onAutosaveToggle(enabled: boolean) {
//     this.autosaveEnabled = enabled;
//     if (!enabled && this.autosaveTimer) {
//       clearTimeout(this.autosaveTimer);
//     }
//     console.log('Autosave is now:', enabled ? 'enabled' : 'disabled');
//   }

//   // Schedule autosave with debounce
//   scheduleAutosave() {
//     if (this.autosaveTimer) {
//       clearTimeout(this.autosaveTimer);
//     }
    
//     this.autosaveTimer = setTimeout(() => {
//       this.autoSave();
//     }, 2000); // Autosave after 2 seconds of inactivity
//   }

//   // Perform autosave
//   autoSave() {
//     if (this.form.valid && this.autosaveEnabled) {
//       console.log('Auto-saving form data:', this.form.value);
//       // You can implement actual autosave logic here
//       // this.formService.autoSaveFormData(this.formType, this.form.value).subscribe();
//     }
//   }

//   submitForm() {
//     if (!this.form.valid) return;
  
//     this.formService.submitFormData(this.formType, this.form.value).subscribe({
//       next: () => this.form.reset(),
//       error: console.error
//     });
//   }

//   ngOnDestroy() {
//     if (this.autosaveTimer) {
//       clearTimeout(this.autosaveTimer);
//     }
//   }
// }



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

    // Subscribe to form changes for autosave
    this.form.valueChanges.subscribe((formValue) => {
      if (this.autosaveEnabled && this.hasFormData(formValue)) {
        this.scheduleAutosave(formValue);
      }
    });
  }

  // Handle autosave toggle change
  onAutosaveToggle(enabled: boolean) {
    this.autosaveEnabled = enabled;
    if (!enabled && this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }
    console.log('Autosave is now:', enabled ? 'enabled' : 'disabled');
  }

  // Handle restore data request from autosave component
  onRestoreDataRequested(savedData: any) {
    if (savedData && this.form) {
      // Patch the form with saved data
      try {
        this.form.patchValue(savedData);
        console.log('Form data restored successfully');
        
        // Show user feedback
        this.showNotification('Your previous form data has been restored!', 'success');
      } catch (error) {
        console.error('Error restoring form data:', error);
        this.showNotification('Failed to restore form data', 'error');
      }
    }
  }

  // Schedule autosave with debounce
  private scheduleAutosave(formValue: any) {
    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }
    
    this.autosaveTimer = setTimeout(() => {
      this.performAutosave(formValue);
    }, this.AUTOSAVE_DELAY);
  }

  // Perform autosave
  private performAutosave(formValue: any) {
    if (this.autosaveEnabled && this.autosaveComponent && this.hasFormData(formValue)) {
      this.autosaveComponent.saveFormData(formValue);
      console.log('Auto-saved form data');
    }
  }

  // Check if form has meaningful data to save
  public hasFormData(formValue: any): boolean {
    if (!formValue) return false;
    
    // Check if at least one field has a non-empty value
    return Object.values(formValue).some(value => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    });
  }

  // Submit form and clear autosaved data
  submitForm() {
    if (!this.form.valid) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }
  
    this.formService.submitFormData(this.formType, this.form.value).subscribe({
      next: (response) => {
        // Clear autosaved data on successful submission
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

  // Manual save option
  saveProgress() {
    if (this.hasFormData(this.form.value) && this.autosaveComponent) {
      this.autosaveComponent.saveFormData(this.form.value);
      this.showNotification('Progress saved!', 'success');
    } else {
      this.showNotification('No data to save', 'warning');
    }
  }

  // Simple notification system (you can replace with a proper toast service)
  private showNotification(message: string, type: 'success' | 'error' | 'warning') {
    // This is a simple implementation - you might want to use a proper toast library
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
    
    // Remove notification after 3 seconds
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