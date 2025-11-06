import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeComponent } from './list-employe/list-employe.component';

const routes: Routes = [
    { path: '', component: ListEmployeComponent }
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class ListEmployeRoutingModule { }
