import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'educational-forms-system';
  selectedFormType: string = 'teacher-form'; 

  changeForm(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedFormType = select.value;
  }
}