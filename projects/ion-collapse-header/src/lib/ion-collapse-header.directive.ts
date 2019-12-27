import { Directive, Input, ElementRef } from '@angular/core';

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
export class IonCollapseHeaderDirective {

  el: ElementRef;
  isResize: boolean;
  offsetTop: number;
  /**
   * @description fit heigth header
   */
  @Input() fit = 0;
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
   * @param el the element ion-content
   */
  constructor(el: ElementRef) {
    this.el = el;
    this.el.nativeElement.scrollEvents = this.scrollEvents;
  }

  get activated(): boolean {
    return !!(this.header && this.content) && !this.isResize;
  }

  /**
   * @description this move the components ion-content and ion-header
   * @param currentY Currente position to move comtent and header
   */
  async moveContent(currentY: number) {
    this.header.el.style.zIndex = 1;
    this.isResize = true;
    this.content.el.style.setProperty('--offset-top', `${currentY}px`);
    this.header.el.style.top = `-${currentY}px`;
    if (this.isResize) {
      setTimeout(() => {
        this.isResize = false;
      }, 20);
    }
  }

  /**
   * @description Emit the event custom to all componet actived dicertive
   * @param customEvent capture the custom event the scroll content
   */
  onContentScroll(customEvent: CustomEvent) {
    if (this.activated) {
      this.offsetTop = this.offsetTop ? this.offsetTop : this.header.el.offsetTop;
      const currentY = customEvent.detail.currentY;
      const offsetTop = this.header.el.offsetTop;
      const offsetHeight = this.header.el.offsetHeight + this.fit;
      if (offsetHeight + offsetTop - this.offsetTop >= 0 && currentY <= offsetHeight) {
        this.moveContent(currentY);
      } else {
        this.moveContent(offsetHeight);
      }
    }
  }

}
