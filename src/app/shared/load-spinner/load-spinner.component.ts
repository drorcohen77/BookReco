import { Component } from '@angular/core';

@Component({
    selector: 'app-load-spinner',
    template: 
        '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./load-spinner.component.scss']
})

export class LoadSpinnerComponent {}