import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-user-item',
    imports: [CommonModule, MatIconModule, MatTooltipModule],
    templateUrl: './user-item.component.html',
    styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
    public name = model<string>('');
    public email = model<string>('');
    public active = model<boolean>(true);
    public deleted = model<boolean>(false);

    public loading = model<boolean>(false);

    protected containerClasses = computed<object>(() => {
        const loading = this.loading();
        return { loading };
    });

    protected nameClasses = computed<object>(() => {
        const loading = this.loading();
        return { 'skeleton-loader': loading };
    });

    protected emailClasses = computed<object>(() => {
        const loading = this.loading();
        return { 'skeleton-loader': loading };
    });

    protected activeClasses = computed<any>(() => {
        const loading = this.loading();
        const active = this.active();
        const disabled = !active && !loading;
        return {
            'skeleton-loader': loading,
            disabled: disabled,
        };
    });

    protected deletedClasses = computed<any>(() => {
        const loading = this.loading();
        const deleted = this.deleted();
        const disabled = !deleted && !loading;
        return {
            'skeleton-loader': loading,
            disabled: disabled,
        };
    });

    protected activeTooltip = computed<string>(() =>
        this.active() ? 'Ativo' : 'Inativo',
    );

    protected deletedTooltip = computed<string>(() =>
        this.deleted() ? 'Deletado' : 'Não deletado',
    );

    protected activeIcon = computed<string>(() =>
        this.loading() ? '' : 'checked',
    );

    protected deletedIcon = computed<string>(() =>
        this.loading() ? '' : 'deleted',
    );
}
