import { Directive, Input, ElementRef } from '@angular/core';

/**
 * IonCollapseHeaderDirective
 * @description this directive collapse header on scroll content
 * @usage
 * ```typescript
 * <ion-header #header></ion-header>
 * <ion-content collapse-header [header]="header" [scrollEvents]=true></ion-content>
 * ```
 */
@Directive({
  selector: '[collapse-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class IonCollapseHeaderDirective {

  el: ElementRef;
  count = 0;

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
   * @param el the element ion-content
   */
  constructor(el: ElementRef) {
    this.el = el;
    if (this.header) {
      this.header.el.style.zIndex = 1;
    }
  }

  /**
   * @description Emit the event custom to all componet actived dicertive
   * @param customEvent capture the custom event the scroll content
   */
  async onContentScroll(customEvent: CustomEvent) {
    if (!!this.header) {
      let currentY = customEvent.detail.currentY;
      currentY = currentY < this.header.el.offsetHeight * 0.9 ? currentY : this.header.el.offsetHeight;
      this.count++;
      if (currentY < this.header.el.offsetHeight * 0.1) {
        this.header.el.style.marginTop = `${0}px`;
      }
      if (this.count >= 2) {
        this.count = 0;
        return;
      }
      this.header.el.style.marginTop = `-${currentY}px`;
    }
  }

}
