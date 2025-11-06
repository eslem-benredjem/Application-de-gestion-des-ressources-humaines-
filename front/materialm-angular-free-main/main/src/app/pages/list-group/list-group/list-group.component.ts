import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/Groupe';
import { GroupList } from 'src/app/models/groupList';
import { GroupService } from 'src/app/services/groupe/groupe.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss'
})
export class ListGroupComponent implements OnInit {
   displayedColumns: string[] = ['id', 'nom', 'nomSupervisor', 'actions'];
    dataSource = new MatTableDataSource<GroupList>([]);
    groupForm: FormGroup;
    supervisors: any[] = [];
    showForm = false;
    groupId: number | null = null;
  
    constructor(
      private fb: FormBuilder,
      private groupService: GroupService,
      private userService: UserService
    ) {
      this.groupForm = this.fb.group({
        groupName: ['', [Validators.required, Validators.minLength(3)]],
        supervisor: ['', Validators.required]
      });
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
    //Affiche ou cache le formulaire d'ajout/modification
    toggleForm(group: GroupList | null = null): void {
      this.showForm = !this.showForm;
    
      if (group) {
        this.groupId = group.id;
                console.log('Supervisor ID:', group.supervisorId);
        // Assurer que supervisorId est un nombre valide
        this.groupForm.setValue({
          groupName: group.nom,
          supervisor: group.supervisorId || '' 
        });
      } else {
        this.groupId = null;
        this.groupForm.reset();
      }
    }  
  
    onSubmit(): void {
      if (this.groupForm.invalid) return;
  
      const groupData: Group = {
        id: this.groupId ?? 0, 
        name: this.groupForm.value.groupName,
        supervisorId: this.groupForm.value.supervisor
      };
  
      if (this.groupId) {
        this.groupService.updateGroup(this.groupId, groupData).subscribe(() => {
          this.loadGroups();
          this.toggleForm();
        });
      } else {
        this.groupService.addGroup(groupData).subscribe(() => {
          this.loadGroups();
          this.toggleForm();
        });
      }
    }
  
    editGroup(group: GroupList): void {
      this.toggleForm(group);
    }
  
    confirmDelete(id: number): void {
      if (confirm('Voulez-vous vraiment supprimer ce groupe ?')) {
        this.groupService.deleteGroup(id).subscribe(() => this.loadGroups());
      }
    }
  }
