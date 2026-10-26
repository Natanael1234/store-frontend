// src/app/guards/auth.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { AuthService } from '@services/auth/auth.service';
import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';

describe('authGuard', () => {
    let authServiceSpy: Mocked<AuthService>;
    let routerSpy: Mocked<Router>;

    beforeEach(() => {
        const authSpy = {
            isAuthenticated: vi.fn(),
        };
        const router = {
            navigate: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: router },
            ],
        });

        authServiceSpy = TestBed.inject(AuthService) as Mocked<AuthService>;
        routerSpy = TestBed.inject(Router) as Mocked<Router>;
    });

    const executeGuard = () => TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    it('deve permitir acesso se o usuário estiver autenticado', () => {
        authServiceSpy.isAuthenticated.mockReturnValue(true);

        const result = executeGuard();

        expect(result).toBe(true);
    });

    it('deve redirecionar para o login se o usuário não estiver autenticado', () => {
        authServiceSpy.isAuthenticated.mockReturnValue(false);

        const result = executeGuard();

        expect(result).toBe(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
});
