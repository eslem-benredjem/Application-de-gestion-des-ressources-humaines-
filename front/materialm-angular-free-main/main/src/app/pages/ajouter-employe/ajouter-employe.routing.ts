import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';


const routes: Routes = [
    { path: '', component: AjouterEmployeComponent }
];


@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class AjouterEmployeRoutingModule { }
