

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // ✅ Import RouterModule and Routes
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FormService } from './form.service';
import { CommonFromComponent } from './common-from/common-from.component';
import { AutosaveComponent } from './autosave/autosave.component';

// ✅ Routes Definition
const routes: Routes = [
  { path: 'add-request', component: CommonFromComponent },
  { path: '', redirectTo: 'add-request', pathMatch: 'full' }, // Optional: Default route
];

@NgModule({
  declarations: [
    AppComponent,
    CommonFromComponent,
    AutosaveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),  // ✅ Add RouterModule with routes
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }

