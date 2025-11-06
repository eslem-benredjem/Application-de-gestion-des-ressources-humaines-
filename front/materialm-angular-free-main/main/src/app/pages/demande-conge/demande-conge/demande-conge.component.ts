import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LeaveRequest, Statut } from 'src/app/models/LeaveRequest ';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DemandeService } from 'src/app/services/demande/demande.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrl: './demande-conge.component.scss'
})
export class DemandeCongeComponent {
absenceForm: FormGroup;
  leaveRequests = new MatTableDataSource<LeaveRequest>([]);
  displayedColumns: string[] = ['id', 'dateDebut', 'dateFin', 'cause', 'status', 'actions'];
  successMessage: string = '';
  userId: number = 0; 
  currentLeaveRequestId: number | null = null; 
  currentLeaveRequestStatus: string = ''; 
  
  constructor(
    private fb: FormBuilder,
    private leaveRequestService: DemandeService,
   private authService: AuthService ,
   private snackBar: MatSnackBar 
  ) {
    this.absenceForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      typeAbsence: ['', Validators.required]
    }, { validator: dateValidator }); 
  }

  ngOnInit(): void {
    const userIdFromToken = this.authService.getUserIdFromToken();
    if (userIdFromToken && userIdFromToken !== 0) {
      this.userId = userIdFromToken;
      console.log(`ID utilisateur récupéré : ${this.userId}`);
    } else {
      console.error(" Impossible de récupérer l'ID de l'utilisateur connecté.");
    }
    this.getLeaveRequests();
  }

  onSubmit(): void {
    if (this.absenceForm.valid) {
      const leaveRequest: LeaveRequest = {
        ...this.absenceForm.value,
        userId: this.userId,
        cause: this.absenceForm.value.typeAbsence
      };
  
      if (this.currentLeaveRequestId) {
        this.leaveRequestService.updateLeaveRequest(this.currentLeaveRequestId, leaveRequest).subscribe(() => {
          console.log("Demande de congé mise à jour !");
          this.getLeaveRequests();
          this.absenceForm.reset();
          this.snackBar.open('Demande modifiée avec succès!', 'Fermer', { duration: 3000 });
          this.resetSuccessMessage();
        });
      } else {
        this.leaveRequestService.createLeaveRequest(leaveRequest).subscribe(() => {
          console.log("Demande de congé créée !");
          this.getLeaveRequests();
          this.absenceForm.reset();
          this.snackBar.open('Demande créée avec succès!', 'Fermer', { duration: 3000 });
          this.resetSuccessMessage();
        });
      }
    } else {
      this.absenceForm.markAllAsTouched();  
    }
  }
  

  getLeaveRequests(): void {
    if (this.userId === 0) {
      console.error("Impossible de récupérer les demandes, userId = 0");
      return;
    }
    
    this.leaveRequestService.getLeaveRequestsByUser(this.userId).subscribe((data) => {
      this.leaveRequests.data = data;
      console.log(" Liste des demandes récupérées :", this.leaveRequests);
    });
  }

  onEdit(leave: LeaveRequest): void {
    if (leave.status !== Statut.EN_COURS_DE_TRAITEMENT) {
      alert('Cette demande ne peut pas être modifiée.');
      return;
    }

    this.absenceForm.patchValue({
      dateDebut: leave.dateDebut,
      dateFin: leave.dateFin,
      typeAbsence: leave.cause
    });
    this.currentLeaveRequestId = leave.id; 
    this.currentLeaveRequestStatus = leave.status; 
  }

  onDelete(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette demande ?")) {
      this.leaveRequestService.deleteLeaveRequest(id).subscribe(() => {
        console.log(` Demande de congé ${id} supprimée !`);
        this.getLeaveRequests();
      });
    }
  }

  onReset(): void {
    this.absenceForm.reset();
    this.currentLeaveRequestId = null; 
    this.currentLeaveRequestStatus = ''; 
    this.successMessage = ''; 
  }

  isEditable(leave: LeaveRequest): boolean {
    return leave.status === Statut.EN_COURS_DE_TRAITEMENT;
  }

  resetSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 3000); 
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'EN_COURS_DE_TRAITEMENT':
        return 'status-processing';
      case 'ACCEPTE':
        return 'status-approved';
      case 'REFUSE':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  }
}

function dateValidator(control: AbstractControl): ValidationErrors | null {
  const dateDebut = control.get('dateDebut')?.value;
  const dateFin = control.get('dateFin')?.value;
  const currentDate = new Date();

  if (dateDebut && new Date(dateDebut) < currentDate) {
    return { dateDebutInvalid: 'La date de début doit être supérieure à la date actuelle.' };
  }

  if (dateFin && (new Date(dateFin) <= currentDate || new Date(dateFin) <= new Date(dateDebut))) {
    return { dateFinInvalid: 'La date de fin doit être supérieure à la date actuelle et à la date de début.' };
  }

  return null;
}



