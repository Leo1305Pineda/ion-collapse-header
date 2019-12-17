# IonCollapseHeader

This directive collapse header in ionic 4 with the scroll content.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3.

## Installing

Run `npm i ion-collapse-header`.

## Quickstart

```typescript
// Import the module
import { IonCollapseHeaderModule } from 'ion-collapse-header';
...
@NgModule({
    (...)
    imports: [
        IonCollapseHeaderModule,
    ],
    (...)
})
export class PageModule {}
```

# Usage

```html
 <ion-header #header></ion-header>
 <ion-content #content collapse-header [scrollEvents]=true [content]="content" [header]="header"></ion-content>
```