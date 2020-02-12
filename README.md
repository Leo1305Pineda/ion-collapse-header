# IonCollapseHeader

This directive collapse header in ionic 4 with the scroll content.

## Installing

Run `npm i ion-collapse-header`.

## Quickstart

Import ion-collapse-header in you module page.

```typescript
// Import the module
import { IonCollapseHeaderModule } from 'ion-collapse-header';
...
@NgModule({
    (...)
    imports: [
        IonCollapseHeaderModule
    ],
    (...)
})
export class PageModule {}
```

## Usage

Then, just define collapse-haeder in the tag ion-content.

```html
 <ion-header #header></ion-header>
 <ion-content collapse-header [header]="header" [scrollEvents]=true></ion-content>
```