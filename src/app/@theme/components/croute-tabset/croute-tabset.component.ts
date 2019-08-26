import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nb-croute-tabset',
  styleUrls: ['./croute-tabset.component.scss'],
  template: `
  <nb-card>
    <ul class="croute-tabset">
      <ng-container *ngFor="let tab of tabs">
        <li *ngIf="tab.disabled; else enabled"
            [class.responsive]="tab.responsive"
            class="croute-tab disabled"
            tabindex="-1">
          <a tabindex="-1">
            <i *ngIf="tab.icon" [class]="tab.icon"></i>
            <span *ngIf="tab.title">{{ tab.title }}</span>
          </a>
        </li>

        <ng-template #enabled>
          <li (click)="$event.preventDefault(); selectTab(tab)"
              [routerLink]="tab.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="activeLinkOptions"
              [class.responsive]="tab.responsive"
              tabindex="0"
              class="croute-tab">
            <a tabindex="-1">
              <i *ngIf="tab.icon" [class]="tab.icon"></i>
              <span *ngIf="tab.title">{{ tab.title }}</span>
            </a>
          </li>
        </ng-template>
      </ng-container>
    </ul>
    </nb-card>
    <router-outlet *ngIf="showContent"></router-outlet>
  `,
})
export class RouteTabsetComponent {
  showContent = false;

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.showContent = false;
    });

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showContent = true;
    });
  }

  @HostBinding('class.full-width') fullWidthValue: boolean = false;

  /**
   * Tabs configuration
   * @param Object{route: string, title: string, tag?: string, responsive?: boolean, disabled?: boolean}
   */
  @Input() tabs: any[];

  /**
   * Options passed to `routerLinkActiveOptions` directive which set on tab links.
   * `{ exact: true }` by default.
   */
  @Input() activeLinkOptions = { exact: true };

  /**
   * Take full width of a parent
   * @param {boolean} val
   */
  @Input()
  set fullWidth(val: boolean) {
    this.fullWidthValue = val;
  }

  /**
   * Emits when tab is selected
   * @type {EventEmitter<any>}
   */
  @Output() changeTab = new EventEmitter<any>();

  selectTab(tab: any) {
    this.changeTab.emit(tab);
  }
}