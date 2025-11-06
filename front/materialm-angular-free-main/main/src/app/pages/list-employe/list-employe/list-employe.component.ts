import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserList } from 'src/app/models/userList';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrl: './list-employe.component.scss'
})
export class ListEmployeComponent {
   displayedColumns: string[] = ['id', 'cin', 'nom', 'prenom', 'adresseMail', 'role', 'actions'];
   dataSource = new MatTableDataSource<any>([]);
  employes: UserList[] = [];
  
    constructor(private employeService: UserService, private router: Router) { }
  
    ngOnInit(): void {
      this.loadEmployees();
    }
  
    loadEmployees(): void {
      this.employeService.getListUsers().subscribe({
        next: (data) => {
          this.employes = data;
          this.dataSource.data = data;  // Mettre à jour la table Angular Material
          console.log('Liste des employés : ', this.employes);
        },
        error: (err) => console.error('Erreur lors du chargement des utilisateurs : ', err)
      });
    }
    
  
    onEditUser(id: number): void {
      console.log('Navigating to edit user with ID:', id);
      this.router.navigate(['dashboard/ajouter', id]);  
    }
  
    confirmDelete(id: number): void {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        this.employeService.deleteUser(id).subscribe({
          next: () => {
            console.log("Utilisateur supprimé avec succès !");
            this.loadEmployees(); 
          },
          error: (err) => {
            console.error("Erreur lors de la suppression : ", err);
          },
        });
      }
    }
    
}
