import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import { AjouterEmployeRoutingModule } from './ajouter-employe.routing';



@NgModule({
  declarations: [
    AjouterEmployeComponent
  ],
  imports: [
    CommonModule,
     MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        AjouterEmployeRoutingModule
  ]
})
export class AjouterEmployeModule { }
