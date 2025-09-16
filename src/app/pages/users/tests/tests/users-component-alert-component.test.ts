import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from '../../../../components/alert/alert.component';
import { UsersComponent } from '../../users.component';

export function _testUsersComponentAlertComponent(
    fixture: ComponentFixture<UsersComponent>,
    options: { error?: string },
) {
    const { error } = options;
    // no alert
    const alerts: DebugElement[] = fixture.debugElement.queryAll(
        By.directive(AlertComponent),
    );

    const showingError = !!error;
    expect(alerts.length)
        .withContext('number of errors')
        .toEqual(showingError ? 1 : 0);
    if (error) {
        const alert: AlertComponent = alerts[0].componentInstance;
        const textContent = alerts[0].nativeElement.textContent.trim();

        expect(textContent).withContext('error message').toEqual(error);
        expect(alert.icon).withContext('error icon').toEqual('error');
        expect(alert.type).withContext('alert type').toEqual('danger');
        expect(alert.showCloseButton)
            .withContext('show close button')
            .toEqual(true);
    }
}
