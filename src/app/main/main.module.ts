import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainComponent } from './main.component';
import { SharedVariables } from './home-page/book-details/shared-BookDetails/Shared_variables';
import { Variables } from '../shared/variables';
import { CounterPanelComponent } from './counter-panel/counter-panel.component';
import { MainRoutingModule } from './main-routing.module';
import { CanDeactivateGuard } from './share/can-deactivate-guard.service';



@NgModule({
  declarations: [
    MainComponent,
    CounterPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    // StoreModule.forRoot(fromApp.appReducer.homepage)
    NgbModule.forRoot()
  ],
  providers: [
    Variables,
    SharedVariables,
    CanDeactivateGuard
  ]
})

export class MainModule { }
