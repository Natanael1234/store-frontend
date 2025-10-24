import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTextFieldComponent } from './dynamic-text-field.component';

describe('DynamicTextFieldComponent', () => {
  let component: DynamicTextFieldComponent;
  let fixture: ComponentFixture<DynamicTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTextFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
