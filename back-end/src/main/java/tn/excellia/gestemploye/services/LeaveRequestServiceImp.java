package tn.excellia.gestemploye.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.excellia.gestemploye.dtos.LeaveRequestDto;
import tn.excellia.gestemploye.dtos.LeaveRequestListUser;
import tn.excellia.gestemploye.dtos.leaveRequestListAdmin;
import tn.excellia.gestemploye.models.LeaveConfig;
import tn.excellia.gestemploye.models.LeaveRequest;
import tn.excellia.gestemploye.models.Statut;
import tn.excellia.gestemploye.models.User;
import tn.excellia.gestemploye.repositories.LeaveConfigRepository;
import tn.excellia.gestemploye.repositories.LeaveRequestRepository;
import tn.excellia.gestemploye.repositories.UserRepository;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class LeaveRequestServiceImp implements LeaveRequestService {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeaveConfigRepository leaveConfigRepository;

    @Override
    public LeaveRequest createLeaveRequest(LeaveRequestDto leaveRequestDTO) {
        if (leaveRequestDTO.getUserId() == null) {
            throw new RuntimeException("L'ID de l'utilisateur ne peut pas être null !");
        }

        LeaveRequest leaveRequest = new LeaveRequest();
        User user = userRepository.findById(leaveRequestDTO.getUserId()).orElseThrow(() ->
                new RuntimeException("Utilisateur introuvable avec l'ID : " + leaveRequestDTO.getUserId()));

        leaveRequest.setUser(user);
        leaveRequest.setDateDebut(leaveRequestDTO.getDateDebut());
        leaveRequest.setDateFin(leaveRequestDTO.getDateFin());
        leaveRequest.setCause(leaveRequestDTO.getCause());
        leaveRequest.setStatus(Statut.EN_COURS_DE_TRAITEMENT);

        return leaveRequestRepository.save(leaveRequest);
    }


    @Override
    public List<LeaveRequestListUser> getLeaveRequestsByUser(Long userId) {
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findByUserId(userId);

        return leaveRequests.stream().map(leave -> {
            LeaveRequestListUser dto = new LeaveRequestListUser();
            dto.setId(leave.getIdLeaveRequest());
            dto.setDateDebut(leave.getDateDebut());
            dto.setDateFin(leave.getDateFin());
            dto.setCause(leave.getCause());
            dto.setStatus(leave.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    //liste des leaveRequest qui ont comme statut en cous de traitement
    @Override
    public List<leaveRequestListAdmin> getLeaveRequestsAdmin() {
        // Filtrer les demandes dont le statut est EN_COURS_DE_TRAITEMENT
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findAll().stream()
                .filter(leave -> leave.getStatus() == Statut.EN_COURS_DE_TRAITEMENT)
                .collect(Collectors.toList());

        return leaveRequests.stream().map(leave -> {
            leaveRequestListAdmin dto = new leaveRequestListAdmin();
            dto.setId((int) leave.getIdLeaveRequest());
            dto.setDateDebut(leave.getDateDebut());
            dto.setDateFin(leave.getDateFin());
            dto.setCause(leave.getCause());
            dto.setDuree((int) ChronoUnit.DAYS.between(leave.getDateDebut(), leave.getDateFin()));
            dto.setNom(leave.getUser().getNom());
            dto.setPrenom(leave.getUser().getPrenom());
            dto.setRole(leave.getUser().getRole().toString());  // Assurez-vous que 'role' est bien défini

            return dto;
        }).collect(Collectors.toList());
    }


    //update leaverequest user
    @Override
    public LeaveRequest updateLeaveRequest(Long leaveRequestId, LeaveRequestDto leaveRequestDTO) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId).orElseThrow(() -> new RuntimeException("Leave request not found"));
        // Vérification du statut
        if (leaveRequest.getStatus() != Statut.EN_COURS_DE_TRAITEMENT) {
            throw new RuntimeException("La demande de congé ne peut être modifiée que si elle est en cours de traitement.");
        }
        // Mise à jour des informations de la demande
        leaveRequest.setDateDebut(leaveRequestDTO.getDateDebut());
        leaveRequest.setDateFin(leaveRequestDTO.getDateFin());
        leaveRequest.setCause(leaveRequestDTO.getCause());

        return leaveRequestRepository.save(leaveRequest);
    }


    //delete leave request user
    @Override
    public void deleteLeaveRequest(Long leaveRequestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new RuntimeException("Demande de congé introuvable"));
        // Vérifie si le statut est bien "EN_COURS_DE_TRAITEMENT"
        if (leaveRequest.getStatus() != Statut.EN_COURS_DE_TRAITEMENT) {
            throw new RuntimeException("Seules les demandes en cours de traitement peuvent être supprimées.");
        }

        leaveRequestRepository.delete(leaveRequest);
    }

    @Override
    public void updateLeaveRequestStatus(Long leaveRequestId, Statut status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId).orElseThrow();
        leaveRequest.setStatus(status);
        leaveRequestRepository.save(leaveRequest);
        if (status == Statut.ACCEPTE) {
            updateLeaveBalance(leaveRequest.getUser());
        }
    }

    //nombre de jours du conge par user
    @Override
    public double calculateLeaveBalance(User user) {
        LocalDate dateEmbauche = user.getDateEmbauche();
        LocalDate currentDate = LocalDate.now();
        long monthsWorked = ChronoUnit.MONTHS.between(dateEmbauche, currentDate);
        LeaveConfig leaveConfig = user.getLeaveConfig();
        return leaveConfig.getSld_mensuelle() * monthsWorked;
    }

    @Override
    public long calculateDuration(LocalDate startDate, LocalDate endDate) {
        return ChronoUnit.DAYS.between(startDate, endDate);
    }

    private void updateLeaveBalance(User user) {
        double leaveBalance = calculateLeaveBalance(user);
        LeaveConfig leaveConfig = user.getLeaveConfig();
        leaveConfig.setSld_mensuelle(leaveBalance);
        leaveConfigRepository.save(leaveConfig);
    }

}
