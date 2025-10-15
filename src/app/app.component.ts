
import {
    AfterViewInit,
    Component,
    computed,
    inject,
    signal,
    ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { ResponsityService } from './services/responsivity/responsivity.service';
import { SidenavService } from './services/sidenav.service';
import { ThemeService } from './services/theme/theme.service';
type MenuItem = { icon: string; label: string; route: string };

@Component({
    selector: 'app-root',
    imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    MatButtonModule
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
    title = 'store-frontend';

    protected themeService: ThemeService = inject(ThemeService);
    protected sidenavService: SidenavService = inject(SidenavService);

    collapsed = signal(false);
    sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

    menuItems = signal<MenuItem[]>([
        {
            icon: 'dashboard',
            label: 'Dashboard',
            route: '',
        },
        {
            icon: 'groups',
            label: 'Usuários',
            route: '/users',
        },
        {
            icon: 'groups',
            label: 'Produtos',
            route: '/products',
        },
    ]);

    routes: Routes = [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
        },
        {
            path: 'home',
            component: HomeComponent,
        },
        {
            path: 'ursers',
            component: UsersComponent,
        },
    ];

    /** Responsivity service. */
    protected responsivityService: ResponsityService =
        inject(ResponsityService);
    /** Subscription of window resize events used for responsiveness. */
    private resizeSubscription!: Subscription;
    /** When true enter in mobile responsive mode. */
    protected mobile: boolean = true;

    @ViewChild(MatDrawer) drawer!: MatDrawer;

    public ngAfterViewInit() {
        // Subscribes window mobile mode detection.
        this.resizeSubscription = this.responsivityService.mobile.subscribe(
            (mobile) => {
                // set mobile mode
                this.mobile = !!mobile;
                if (this.mobile) {
                    this.drawer.close();
                } else {
                    this.drawer.open();
                }
            },
        );
    }

    public ngOnDestroy() {
        this.resizeSubscription?.unsubscribe();
    }
}
