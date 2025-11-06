import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};  
  isEditing = false; 
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserProfile();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      genre: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Charge le profil de l'utilisateur depuis le service
  loadUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      this.user = data;
      console.log('User loaded:', this.user);

      if (this.user) {
        this.userForm.patchValue({
          cin: this.user.cin,
          nom: this.user.nom,
          prenom: this.user.prenom,
          genre: this.user.genre,
          dateNaissance: this.user.dateNaissance,
          adresse: this.user.adresse,
          telephone: this.user.telephone,
          email: this.user.email
        });
      }
    });
  }

  // Fonction pour basculer entre l'affichage et l'édition
  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.userForm.patchValue({
        cin: this.user.cin,
        nom: this.user.nom,
        prenom: this.user.prenom,
        genre: this.user.genre,
        dateNaissance: this.user.dateNaissance,
        adresse: this.user.adresse,
        telephone: this.user.telephone,
        email: this.user.email
      });
    }
  }

  // Fonction pour sauvegarder les changements du formulaire
  saveChanges() {
    // Créer un objet 
    const updatedUser = this.userForm.value;
    this.userService.updateProfile(updatedUser).subscribe(() => {
      console.log('Profil mis à jour');
      this.isEditing = false;
      this.loadUserProfile();  
    });
  }
}
