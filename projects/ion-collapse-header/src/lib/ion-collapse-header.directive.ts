import { Directive, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

/**
 * IonCollapseHeaderDirective
 * @description this directive collapse header on scroll content
 * @usage
 * ```typescript
 * <ion-header #header></ion-header>
 * <ion-content #content collapse-header [scrollEvents]=true [content]="content" [header]="header"></ion-content>
 * ```
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[collapse-header]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class IonCollapseHeaderDirective implements OnInit, OnDestroy {

  scroll: any;
  activated: boolean;
  /**
   * @description input ion-header conponet
   * @usage
   * ```typescript
   * <ion-header #header></ion-header>
   * <ion-content [header]="header"></ion-content>
   * ```
   */
  @Input() header: any;
  /**
   * @description input ion-header conponet
   * @usage
   * ```typescript
   * <ion-content #content [content]="content"></ion-content>
   * ```
   */
  @Input() content: any;
  /**
   * @description
   * @usage
   * ```typescript
   * <ion-content [scrollEvents]=true ></ion-content>
   * ```
   */
  @Input() scrollEvents: boolean;

  /**
   * @description subcription to custom event scroll
   * @see onScroll
   */
  private onScroll = new Subject<CustomEvent>();
  private onScrollSub: Subscription;

  /**
   * @param el the element ion-content
   */
  constructor(el: ElementRef) {
    this.scroll = el;
  }

  /**
   * initialize directive
   */
  ngOnInit(): void {
    this.scroll.nativeElement.scrollEvents = this.scrollEvents;
    this.activated = this.header && this.content;
    this.onScrollSub = this.onScroll.subscribe((customEvent: CustomEvent) => {
      if (this.activated) {
        const offsetHeight = this.header.el.offsetHeight;
        const currentY = customEvent.detail.currentY;
        if (currentY >= 0 && currentY < offsetHeight) {
          this.moveContent(currentY);
        } else if (currentY >= offsetHeight) {
          this.moveContent(offsetHeight);
        }
      }
    });
  }

  /**
   * @description this move the components ion-content and ion-header
   * @param currentY Currente position to move comtent and header
   */
  moveContent(currentY: number) {
    this.header.el.style.zIndex = 1;
    this.content.el.style.setProperty('--offset-top',  `${currentY}px`);
    this.header.el.style.top = `-${currentY}px`;
  }

  /**
   * @description Emit the event custom to all componet actived dicertive
   * @param customEvent capture the custom event the scroll content
   */
  onContentScroll(customEvent: CustomEvent) {
    if (this.activated) {
      this.onScroll.next(customEvent);
    }
  }

  /**
   * @description Destroy the directived
   */
  ngOnDestroy(): void {
    if (this.onScrollSub) {
      this.onScrollSub.unsubscribe();
    }
  }

}
