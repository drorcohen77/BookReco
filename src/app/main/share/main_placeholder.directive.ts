import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class MainPlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}