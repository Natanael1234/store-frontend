import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserDialogComponent, UserDialogData } from './user-dialog.component';

describe('UserDialogComponent', () => {
    let component: UserDialogComponent;
    let fixture: ComponentFixture<UserDialogComponent>;
    let mockDialogRef: Partial<MatDialogRef<UserDialogComponent>>;

    const mockDialogData: UserDialogData = {
        updated: true,
    };

    beforeEach(async () => {
        mockDialogRef = {
            close: vi.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [UserDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create.', () => {
        expect(component).toBeTruthy();
    });

    it('deve inicializar o signal userResult com o valor enviado via MAT_DIALOG_DATA.', () => {
        expect(component.userResult()).toBe(true);
    });

    it('deve fechar o diálogo ao executar onNoClick()', () => {
        component.onNoClick();
        expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
    });

    it('deve atualizar o valor do model signal ao alterar a propriedade', () => {
        component.userResult.set(false);
        expect(component.userResult()).toBe(false);
    });
});
