import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ProfileRoutingModule } from './profile.routing';



@NgModule({
  declarations: [
    ProfileComponent
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
            MatTableModule,
            MatIconModule,
            MatMenuModule,
            MaterialModule,
            ProfileRoutingModule
  ]
})
export class ProfileModule { }
