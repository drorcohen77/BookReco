import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class BookDetailsPlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}