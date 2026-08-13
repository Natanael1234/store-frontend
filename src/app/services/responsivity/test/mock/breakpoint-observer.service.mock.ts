import { BreakpointState } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';

export class MockBreakpointObserver {
    private subject = new Subject<BreakpointState>();

    observe(_: string | string[]): Observable<BreakpointState> {
        return this.subject.asObservable();
    }

    /** Helper method to emit a mocked breakpoint result */
    emitMatch(matches: boolean): void {
        this.subject.next({ matches, breakpoints: {} });
    }
}
