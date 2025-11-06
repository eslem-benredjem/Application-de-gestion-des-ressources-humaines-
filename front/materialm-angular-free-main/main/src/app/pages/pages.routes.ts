import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const routes: Routes = [
  { path: '', component: StarterComponent },
  { path: 'ajouter', loadChildren: () => import('./ajouter-employe/ajouter-employe.module').then(m => m.AjouterEmployeModule) },
  { path: 'ajouter/:id', loadChildren: () => import('./ajouter-employe/ajouter-employe.module').then(m => m.AjouterEmployeModule)  },
  { path: 'listEmploye', loadChildren: () => import('./list-employe/list-employe.module').then(m => m.ListEmployeModule) },
  { path: 'listEmployeRes', loadChildren: () => import('./list-employe-res/list-employe-res.module').then(m => m.ListEmployeResModule) },
  { path: 'listGroup', loadChildren: () => import('./list-group/list-group.module').then(m => m.ListGroupModule) },
  { path: 'demande', loadChildren: () => import('./demande-conge/demande-conge.module').then(m => m.DemandeCongeModule) },
  { path: 'listConge', loadChildren: () => import('./list-conge/list-conge.module').then(m => m.ListCongeModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
