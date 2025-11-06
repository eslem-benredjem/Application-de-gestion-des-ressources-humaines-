import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserList } from 'src/app/models/userList';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-employe-res',
  templateUrl: './list-employe-res.component.html',
  styleUrl: './list-employe-res.component.scss'
})
export class ListEmployeResComponent {
  displayedColumns: string[] = ['id', 'cin', 'nom', 'prenom', 'adresseMail', 'role'];
  dataSource = new MatTableDataSource<User>([]);
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Charge la liste des employés pour le responsable authentifié
  loadEmployees(): void {
    this.userService.getEmployeesForSupervisor().subscribe({
      next: (data) => {
        this.dataSource.data = data;  
        console.log('Liste des employés:', data);
      },
      error: (err) => console.error('Erreur lors du chargement des employés :', err)
    });
  }
  }