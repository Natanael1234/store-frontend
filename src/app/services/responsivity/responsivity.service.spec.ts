import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResponsivityService } from './responsivity.service';

describe('ResponsivityService', () => {
    let service: ResponsivityService;

    const setViewportWidth = (width: number) => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
        });
    };

    beforeEach(() => {
        setViewportWidth(1024);

        TestBed.configureTestingModule({
            providers: [ResponsivityService],
        });

        service = TestBed.inject(ResponsivityService) as ResponsivityService;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize as desktop when innerWidth >= 768px', () => {
        setViewportWidth(1024);
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [ResponsivityService] });

        const serviceDesktop = TestBed.inject(ResponsivityService) as ResponsivityService;
        expect(serviceDesktop.isMobile()).toBe(false);
    });

    it('should initialize as mobile when innerWidth < 768px', () => {
        setViewportWidth(375);
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [ResponsivityService] });

        const serviceMobile = TestBed.inject(ResponsivityService) as ResponsivityService;
        expect(serviceMobile.isMobile()).toBe(true);
    });

    it('should update isMobile status on window resize', () => {
        expect(service.isMobile()).toBe(false);

        setViewportWidth(500);
        window.dispatchEvent(new Event('resize'));
        expect(service.isMobile()).toBe(true);

        setViewportWidth(1200);
        window.dispatchEvent(new Event('resize'));
        expect(service.isMobile()).toBe(false);
    });
});
