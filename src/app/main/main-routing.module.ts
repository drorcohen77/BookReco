import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CounterPanelComponent } from './counter-panel/counter-panel.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                loadChildren: './home-page/home-page.module#HomePageModule'
            },
            {
                path: 'main', 
                component: CounterPanelComponent, 
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class MainRoutingModule {}