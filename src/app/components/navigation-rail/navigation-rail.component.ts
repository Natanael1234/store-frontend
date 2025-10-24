import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { leftMouseClickFilter } from '../../utils/mouse-events/mouse-click-filter';

export enum NavigationRailStateTransition {
    none = 'none',
    collapse = 'collapse',
    open = 'open',
}
export enum RailClasses {
    collapsed = 'collapsed',
    opened = 'opened',
    transition = 'transition',
}

type NavigationRailItem = {
    icon: string;
    label: string;
    route: string;
};

@Component({
    selector: 'app-navigation-rail',
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './navigation-rail.component.html',
    styleUrl: './navigation-rail.component.scss',
})
export class SidenavMenuComponent {
    public collapsed = model<boolean>(true);
    public transition = model<boolean>(false);

    protected cssClasses = computed(() => {
        const classes = [
            this.collapsed() ? RailClasses.collapsed : RailClasses.opened,
            this.transition() ? RailClasses.transition : '',
        ];
        return classes;
    });

    protected menuItems = model<NavigationRailItem[]>([
        {
            icon: 'dashboard',
            label: 'Dashboard sdfghgfhghg',
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
    @Output() public onClose = new EventEmitter<boolean>();

    constructor() {}

    protected fireOnCloseEvent(event: MouseEvent) {
        if (leftMouseClickFilter(event)) {
            this.onClose.emit();
        }
    }
}
