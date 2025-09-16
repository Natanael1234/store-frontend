import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ResponsityService {
    private mobileSubject = new BehaviorSubject<boolean>(this.isMobile());
    public mobile = this.mobileSubject.asObservable();

    constructor() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private isMobile(): boolean {
        return window.innerWidth < 768; // Define 768px como ponto de corte para mobile
    }

    private onResize(): void {
        const isNowMobile = this.isMobile();
        if (this.mobileSubject.value !== isNowMobile) {
            this.mobileSubject.next(isNowMobile);
        }
    }
}
