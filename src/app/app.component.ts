import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    computed,
    inject,
    model,
    ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationRailComponent } from '@components/navigation-rail/navigation-rail.component';
import { NavigationRailItem } from '@components/navigation-rail/types/navigation-rail-item/navigation-rail-item.type';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { DrawerMode } from '@enums/drawer-mode/drawer-mode';
import { ResponsityService } from '@services/responsivity/responsivity.service';
import { ThemeService } from '@services/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        RouterModule,
        MatButtonModule,
        MatListModule,
        NavigationRailComponent,
        ToolbarComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [],
})
export class AppComponent implements AfterViewInit {
    protected mobile = model<boolean>(false);
    protected hasBackdrop = computed(() => this.mobile());
    protected responsivity: ResponsityService = inject(ResponsityService);
    private resizeSubscription!: Subscription;
    protected themeService: ThemeService = inject(ThemeService);
    public railCollapsed = model<boolean>(false);
    public railTransition = model<boolean>(false);

    public railItems = model<NavigationRailItem[]>([
        {
            id: 'dashboard',
            icon: 'dashboard',
            label: 'Dashboard',
            route: '',
        },
        {
            id: 'users',
            icon: 'groups',
            label: 'Usuários',
            route: '/users',
        },
        {
            id: 'test',
            icon: 'groups',
            label: 'Teste',
            route: '/test',
        },
    ]);

    @ViewChild(MatDrawer) drawer!: MatDrawer;

    constructor(private cdr: ChangeDetectorRef) {}

    public ngAfterViewInit() {
        let transition = false;
        this.resizeSubscription = this.responsivity.mobile.subscribe(
            (mobile) => {
                if (mobile) {
                    this.expandRail({ transition: true });
                    this.setMobile({ mobile: true, transition });
                } else {
                    this.expandRail({ transition: false });
                    this.setMobile({ mobile: false, transition });
                }
                transition = true;
            },
        );
        this.cdr.detectChanges();
    }

    protected toggleMenu() {
        if (this.mobile()) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            if (this.railCollapsed()) {
                this.expandRail();
            } else {
                this.collapseRail();
            }
        }
    }

    protected closeMenu() {
        if (this.mobile()) {
            if (this.drawer.opened) {
                this.drawer.close();
            }
        }
    }

    private setMobile(options: { mobile: boolean; transition?: boolean }) {
        options.transition = options.transition ?? true;
        if (options.mobile) {
            this.mobile.set(true);
            this.drawer.mode = DrawerMode.over;
            this.drawer.close();
        } else {
            this.mobile.set(false);
            this.drawer.mode = DrawerMode.side;
            this.drawer.open();
        }
    }

    private expandRail(options?: { transition: boolean }) {
        this.railCollapsed.set(false);
        this.railTransition.set(options?.transition ?? true);
    }

    private collapseRail(options?: { transition: boolean }) {
        this.railCollapsed.set(true);
        this.railTransition.set(options?.transition ?? true);
    }

    public ngOnDestroy() {
        this.resizeSubscription?.unsubscribe();
    }
}
