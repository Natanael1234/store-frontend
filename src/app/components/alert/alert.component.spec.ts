import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    template: `<app-alert
    ><div class="test" type="success">Hello World</div></app-alert
  >`,
    imports: [AlertComponent, CommonModule]
})
class TestHostComponent {}

describe('AlertComponent', () => {
  let alertComponent: AlertComponent;
  let alertFixture: ComponentFixture<AlertComponent>;
  let alertDebugElement: DebugElement;

  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, TestHostComponent],
    }).compileComponents();

    alertFixture = TestBed.createComponent(AlertComponent);
    alertComponent = alertFixture.componentInstance;
    alertDebugElement = alertFixture.debugElement;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostDebugElement = hostFixture.debugElement;

    alertFixture.detectChanges();
  });

  it('should create', () => {
    expect(alertComponent).toBeTruthy();
  });

  it('should render corret alert structure', () => {
    alertComponent.type = 'success';
    alertComponent.icon = 'a';
    alertFixture.detectChanges();
    const container =
      alertDebugElement.nativeElement.querySelector('.container');
    expect(container.classList).toContain('success');
  });

  describe('type', () => {
    it('should render success alert when "success" type is provided', () => {
      alertComponent.type = 'success';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('success');
    });

    it('should render info alert when "info" type is provided', () => {
      alertComponent.type = 'info';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('info');
    });

    it('should render warning alert when "warning" type is provided', () => {
      alertComponent.type = 'warning';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('warning');
    });

    it('should render danger alert when "danger" type is danger', () => {
      alertComponent.type = 'danger';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('danger');
    });

    it('should render success alert when "primary" type is danger', () => {
      alertComponent.type = 'primary';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('primary');
    });

    it('should render secondary alert when "secondary" type is danger', () => {
      alertComponent.type = 'secondary';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('secondary');
    });

    it('should render light alert when "light" type is danger', () => {
      alertComponent.type = 'light';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('light');
    });

    it('should render dark alert when "dark" type is danger', () => {
      alertComponent.type = 'dark';
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('dark');
    });

    it('should render success alert when type is not provided', () => {
      alertFixture.detectChanges();
      const container =
        alertDebugElement.nativeElement.querySelector('.container');
      expect(container.classList).toContain('success');
    });
  });

  describe('icon', () => {
    it('should render with icon if provided', () => {
      alertComponent.icon = 'check';
      alertFixture.detectChanges();
      const icon = alertDebugElement.nativeElement.querySelector(
        '.container > .content > mat-icon'
      );
      expect(icon).toBeDefined();
      expect(icon.getAttribute('data-mat-icon-name')).toBe('check');
    });

    it('should render without icon if provided', () => {
      alertFixture.detectChanges();
      const icon = alertDebugElement.nativeElement.querySelector('mat-icon');
      expect(icon).toBeNull();
    });
  });

  describe('close button', () => {
    it('should render close button if showCloseButton is true', () => {
      alertComponent.showCloseButton = true;
      alertFixture.detectChanges();
      const closeButton = alertDebugElement.nativeElement.querySelector(
        '.container > button'
      );
      expect(closeButton).toBeTruthy();
      const icon = alertDebugElement.nativeElement.querySelector(
        '.container > button > mat-icon'
      );
      expect(icon).not.toBeNull();
      expect(icon.textContent).toBe('close');
    });

    it('should not render close button if showCloseButton is false', () => {
      alertComponent.showCloseButton = false;
      alertFixture.detectChanges();
      const closeButton = alertDebugElement.nativeElement.querySelector(
        'button.close-button'
      );
      expect(closeButton).toBeNull();
    });

    it('should emit onClose event when close button is clicked', () => {
      spyOn(alertComponent.onClose, 'emit');
      alertComponent.showCloseButton = true;
      alertFixture.detectChanges();
      const closeButton = alertDebugElement.nativeElement.querySelector(
        'button.close-button'
      );
      closeButton.click();
      expect(alertComponent.onClose.emit).toHaveBeenCalled();
    });
  });

  describe('content', () => {
    it('should project content inside <ng-content></ng-content>', async () => {
      expect(hostDebugElement.children).toHaveSize(1);
      const message = hostDebugElement.nativeElement.querySelector(
        'app-alert > .container > .content > .message > div.test'
      );
      expect(message).not.toBeNull();
      expect(message.textContent).toEqual('Hello World');
    });
  });
});
