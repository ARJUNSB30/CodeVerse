import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutosaveStorageService {
  private readonly AUTOSAVE_PREFIX = 'autosave_';
  private readonly EXPIRY_DAYS = 7; // Data expires after 7 days

  constructor() {}
  saveFormData(formType: string, formData: any): void {
    try {
      const storageKey = this.getStorageKey(formType);
      const dataToStore = {
        formData,
        timestamp: Date.now(),
        formType
      };
      
      localStorage.setItem(storageKey, JSON.stringify(dataToStore));
      console.log(`Form data saved for ${formType}`);
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  }
  getFormData(formType: string): any {
    try {
      const storageKey = this.getStorageKey(formType);
      const storedData = localStorage.getItem(storageKey);
      
      if (!storedData) {
        return null;
      }

      const parsedData = JSON.parse(storedData);
     
      if (this.isDataExpired(parsedData.timestamp)) {
        this.clearFormData(formType);
        return null;
      }

      return parsedData.formData;
    } catch (error) {
      console.error('Failed to retrieve form data:', error);
      return null;
    }
  }
  hasFormData(formType: string): boolean {
    const data = this.getFormData(formType);
    return data !== null && Object.keys(data).length > 0;
  }

  clearFormData(formType: string): void {
    try {
      const storageKey = this.getStorageKey(formType);
      localStorage.removeItem(storageKey);
      console.log(`Cleared saved data for ${formType}`);
    } catch (error) {
      console.error('Failed to clear form data:', error);
    }
  }

  getAllSavedForms(): string[] {
    const savedForms: string[] = [];
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.AUTOSAVE_PREFIX)) {
          const formType = key.replace(this.AUTOSAVE_PREFIX, '');
          if (this.hasFormData(formType)) {
            savedForms.push(formType);
          }
        }
      }
    } catch (error) {
      console.error('Failed to get saved forms:', error);
    }

    return savedForms;
  }

  cleanupExpiredData(): void {
    const allForms = this.getAllSavedForms();
    
    allForms.forEach(formType => {
      const storageKey = this.getStorageKey(formType);
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (this.isDataExpired(parsedData.timestamp)) {
            this.clearFormData(formType);
          }
        } catch (error) {
          localStorage.removeItem(storageKey);
        }
      }
    });
  }

  private getStorageKey(formType: string): string {
    return `${this.AUTOSAVE_PREFIX}${formType}`;
  }

  private isDataExpired(timestamp: number): boolean {
    const now = Date.now();
    const expiryTime = this.EXPIRY_DAYS * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    return (now - timestamp) > expiryTime;
  }
}