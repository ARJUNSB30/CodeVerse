

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AutosaveStorageService } from '../autosave-storage.service';

@Component({
  selector: 'app-autosave',
  standalone: false,
  templateUrl: './autosave.component.html',
  styleUrl: './autosave.component.css'
})
export class AutosaveComponent implements OnInit {
  @Input() value: boolean = true;
  @Input() formType: string = '';
  @Input() activeLabel: string = 'Autosave On';
  @Input() inactiveLabel: string = 'Autosave Off';
  @Output() valueChange = new EventEmitter<boolean>();
  @Output() restoreDataRequested = new EventEmitter<any>();

  hasSavedData: boolean = false;
  lastSavedTime: string = '';
  showRestorePrompt: boolean = false;

  constructor(private autosaveStorage: AutosaveStorageService) {}

  ngOnInit() {
    this.checkForSavedData();
    this.autosaveStorage.cleanupExpiredData();
  }

  toggle() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
    
    if (!this.value) {
      this.clearSavedDataIfNeeded();
    }
  }

  checkForSavedData() {
    if (this.formType) {
      this.hasSavedData = this.autosaveStorage.hasFormData(this.formType);
      
      if (this.hasSavedData) {
        this.updateLastSavedTime();
        this.showRestorePrompt = true;
      }
    }
  }

  restoreData() {
    if (this.formType) {
      const savedData = this.autosaveStorage.getFormData(this.formType);
      if (savedData) {
        this.restoreDataRequested.emit(savedData);
        this.showRestorePrompt = false;
        this.updateLastSavedTime();
      }
    }
  }

  dismissRestore() {
    this.showRestorePrompt = false;
  }

  clearSavedData() {
    if (this.formType) {
      const confirmed = confirm('Are you sure you want to clear your saved form data? This cannot be undone.');
      if (confirmed) {
        this.autosaveStorage.clearFormData(this.formType);
        this.hasSavedData = false;
        this.lastSavedTime = '';
        this.showRestorePrompt = false;
      }
    }
  }

  saveFormData(formData: any) {
    if (this.value && this.formType && formData) {
      this.autosaveStorage.saveFormData(this.formType, formData);
      this.hasSavedData = true;
      this.updateLastSavedTime();
    }
  }

  private clearSavedDataIfNeeded() {
    if (this.hasSavedData) {
      const shouldClear = confirm('You have saved form data. Do you want to clear it since autosave is now disabled?');
      if (shouldClear) {
        this.clearSavedData();
      }
    }
  }

  private updateLastSavedTime() {
    const now = new Date();
    this.lastSavedTime = now.toLocaleString();
  }
}