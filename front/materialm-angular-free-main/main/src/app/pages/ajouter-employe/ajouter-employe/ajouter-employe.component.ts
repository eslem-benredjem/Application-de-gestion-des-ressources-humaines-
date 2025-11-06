import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/Groupe';
import { Update } from 'src/app/models/update';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/groupe/groupe.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrl: './ajouter-employe.component.scss'
})
export class AjouterEmployeComponent {
    identifiant: number = 0;
    isModifay: boolean = false;
    employeForm!: FormGroup;
    groups: Group[] = [];
    messageSuccess: string = '';  
  
    constructor(
      private userService: UserService,
      private fb: FormBuilder,
      private groupService: GroupService,
      private activateroute: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar 
    ) {}
  
    ngOnInit(): void {
      this.identifiant = this.activateroute.snapshot.params['id'];
  
      this.employeForm = this.fb.group({
        cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        nom: ['', [Validators.required, Validators.minLength(2)]],
        prenom: ['', [Validators.required, Validators.minLength(2)]],
        genre: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        adresse: ['', Validators.required],
        telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,15}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        dateEmbauche: ['', Validators.required],
        role: ['', Validators.required],
        groupId: ['']
      });
  
      this.loadGroups();
  
      if (this.identifiant) {
        this.userService.getUserById(this.identifiant).subscribe({
          next: (data) => {
            this.employeForm.patchValue(data);
            this.employeForm.removeControl('password');  
            this.isModifay = true;
          },
          error: (error) => {
            console.error("Erreur lors de la récupération de l'employé:", error);
          }
        });
      }
    }
  
    loadGroups(): void {
      this.groupService.getAllGroups().subscribe({
        next: (groups: Group[]) => {
          console.log("Groupes reçus :", groups);
          this.groups = groups;
        },
        error: (err) => console.error("Erreur lors du chargement des groupes", err)
      });
    }
  
    onSubmit(): void {
      if (this.employeForm.invalid) {
        console.log('Formulaire invalide');
        return;
      }
  
      const user: User = new User();
      user.cin = this.employeForm.get('cin')?.value;
      user.nom = this.employeForm.get('nom')?.value;
      user.prenom = this.employeForm.get('prenom')?.value;
      user.genre = this.employeForm.get('genre')?.value;
      user.dateNaissance = this.employeForm.get('dateNaissance')?.value;
      user.adresse = this.employeForm.get('adresse')?.value;
      user.numeroTelephone = this.employeForm.get('telephone')?.value;
      user.adresseMail = this.employeForm.get('email')?.value;
      user.motDePasse = this.employeForm.get('password')?.value || '';
      user.dateEmbauche = this.employeForm.get('dateEmbauche')?.value;
      user.role = this.employeForm.get('role')?.value;
      const selectedGroup = this.employeForm.get('groupId')?.value;
      user.groupId = selectedGroup ? selectedGroup : null;
        
      const update: Update = {
        id: this.identifiant,
        cin: this.employeForm.get('cin')?.value,
        nom: this.employeForm.get('nom')?.value,
        prenom: this.employeForm.get('prenom')?.value,
        genre: this.employeForm.get('genre')?.value,
        dateNaissance: this.employeForm.get('dateNaissance')?.value,
        adresse: this.employeForm.get('adresse')?.value,
        numeroTelephone: this.employeForm.get('telephone')?.value,
        adresseMail: this.employeForm.get('email')?.value,
        dateEmbauche: this.employeForm.get('dateEmbauche')?.value,
        role: this.employeForm.get('role')?.value,
        groupId: this.employeForm.get('groupId')?.value,
      };
  
      if (this.isModifay) {
        // Mettre à jour l'utilisateur existant
        this.userService.updateUser(this.identifiant, update).subscribe({
          next: (response) => {
            console.log('Employé modifié avec succès:', response);
            this.snackBar.open('Employé modifié avec succès !', 'Fermer', { duration: 3000 });
            setTimeout(() => this.messageSuccess = '', 3000);
          },
          error: (error) => {
            console.error('Erreur lors de la modification de l\'employé:', error);
          }
        });
      } else {
        // Ajouter un nouvel utilisateur
        this.userService.addUser(user).subscribe({
          next: (response) => {
            console.log('Employé ajouté avec succès:', response);
            this.snackBar.open('Employé ajouté avec succès!', 'Fermer', { duration: 3000 });
            this.employeForm.reset();
            setTimeout(() => this.messageSuccess = '', 3000);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de l\'employé:', error);
          }
        });
      }
    }
  
    annuler(): void {
      if (this.isModifay) {
        this.router.navigate(['dashboard/listEmploye']); 
      } else {
        if (confirm("Voulez-vous vraiment annuler ?")) {
          this.employeForm.reset();
        }
      }
    }
    get f() {
      return this.employeForm.controls;
    }
  }
  
