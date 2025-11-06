import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeResComponent } from './list-employe-res/list-employe-res.component';

const routes: Routes = [
    { path: '', component:  ListEmployeResComponent}
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class ListEmployeResRoutingModule { }
