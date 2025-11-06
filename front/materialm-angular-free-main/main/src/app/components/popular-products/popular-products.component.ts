import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTableDataSource } from '@angular/material/table';
import { GroupService } from 'src/app/services/groupe/groupe.service';
import { GroupList } from 'src/app/models/groupList';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    TablerIconsModule,
    MatProgressBarModule,
    NgScrollbarModule
  ],
  templateUrl: './popular-products.component.html',
})
export class AppPopularProductsComponent implements OnInit {
 displayedColumns: string[] = [ 'nom', 'nomSupervisor'];
     dataSource = new MatTableDataSource<GroupList>([]);
     groupForm: FormGroup;
     supervisors: any[] = [];
     showForm = false;
     groupId: number | null = null;
   
     constructor(
       private fb: FormBuilder,
       private groupService: GroupService,
       private userService: UserService,
     ) {
     }
   
     ngOnInit(): void {
       this.loadGroups();
       this.loadSupervisors();
     }
   
     loadGroups(): void {
       this.groupService.getListGroups().subscribe((data) => {
         this.dataSource.data = data;
       });
     }
   
     loadSupervisors(): void {
       this.userService.getSupervisors().subscribe((data) => {
         this.supervisors = data;
       });
     }
    
   }

