export enum Statut {
  ACCEPTE = 'ACCEPTE',
  REFUSE = 'REFUSE',
  EN_COURS_DE_TRAITEMENT = 'EN_COURS_DE_TRAITEMENT'
}
export class LeaveRequest {
    id!: number;
    userId!: number;
    dateDebut!: string;
    dateFin!: string;
    status!: Statut;
    cause!: string;
  }
  