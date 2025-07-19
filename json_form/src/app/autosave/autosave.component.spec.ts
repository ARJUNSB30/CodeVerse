import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosaveComponent } from './autosave.component';

describe('AutosaveComponent', () => {
  let component: AutosaveComponent;
  let fixture: ComponentFixture<AutosaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutosaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutosaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
