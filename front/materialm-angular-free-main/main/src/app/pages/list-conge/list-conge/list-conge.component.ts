import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DemandeService } from 'src/app/services/demande/demande.service';

@Component({
  selector: 'app-list-conge',
  templateUrl: './list-conge.component.html',
  styleUrls: ['./list-conge.component.scss']
})
export class ListCongeComponent {
  displayedColumns: string[] = ['id', 'utilisateur', 'dateDebut', 'dateFin', 'duree', 'cause', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  conges: any[] = [];
  isLoading = false;

  constructor(private leaveRequestService: DemandeService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getLeaveRequestsAdmin();
  }

  getLeaveRequestsAdmin(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.leaveRequestService.getLeaveRequestsAdmin().subscribe(
        (data) => {
          this.conges = data;
          this.dataSource = new MatTableDataSource(this.conges);
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des demandes de congé:', error);
          this.isLoading = false;
        }
      );
    }, 1000);
  }

  accepter(id: number) {
    this.leaveRequestService.accepter(id).subscribe({
      next: (response) => {
        alert(response.message);
        this.updateStatus(id, 'Accepted');
      },
      error: (error) => {
        alert(error.error?.error || "Une erreur est survenue.");
      }
    });
  }

  refuser(id: number) {
    this.leaveRequestService.refuser(id).subscribe({
      next: (response) => {
        alert(response.message);
        this.updateStatus(id, 'Rejected');
      },
      error: (error) => {
        console.error('Erreur détaillée lors du refus:', error);
        alert(error?.message || "Une erreur est survenue.");
      }
    });
  }
  

  updateStatus(id: number, status: string) {
    const conge = this.conges.find(c => c.id === id);
    if (conge) {
      conge.status = status;
      this.dataSource = new MatTableDataSource(this.conges);
    }
  }
}
