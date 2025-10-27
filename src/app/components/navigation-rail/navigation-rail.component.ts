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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { leftMouseClickFilter } from '../../utils/mouse-events/mouse-click-filter';
import { NavigationRailItem } from './types/navigation-rail-item/navigation-rail-item.type';

enum RailClasses {
    collapsed = 'collapsed',
    opened = 'opened',
    transition = 'transition',
}

const paramsSubject = new BehaviorSubject({});
@Component({
    selector: 'app-navigation-rail',
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [
        {
            provide: ActivatedRoute,
            useValue: {
                params: paramsSubject,
            },
        },
    ],
    templateUrl: './navigation-rail.component.html',
    styleUrl: './navigation-rail.component.scss',
})
export class NavigationRailComponent {
    public collapsed = model<boolean>(true);
    public transition = model<boolean>(false);

    protected cssClasses = computed(() => {
        const classes = {
            [RailClasses.collapsed]: !!this.collapsed(),
            [RailClasses.opened]: !this.collapsed(),
            [RailClasses.transition]: !!this.transition(),
        };
        return classes;
    });

    public items = model<NavigationRailItem[]>([]);
    @Output() public onClose = new EventEmitter();

    constructor() {}

    protected fireOnCloseEvent(event: MouseEvent) {
        if (leftMouseClickFilter(event)) {
            this.onClose.emit();
        }
    }
}
