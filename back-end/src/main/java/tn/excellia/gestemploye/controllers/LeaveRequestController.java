package tn.excellia.gestemploye.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tn.excellia.gestemploye.dtos.LeaveRequestDto;
import tn.excellia.gestemploye.dtos.LeaveRequestListUser;
import tn.excellia.gestemploye.dtos.leaveRequestListAdmin;
import tn.excellia.gestemploye.models.LeaveRequest;
import tn.excellia.gestemploye.models.Statut;
import tn.excellia.gestemploye.services.LeaveRequestService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
//@PreAuthorize("hasRole('ROLE_RESPONSABLE')")
@RequestMapping("/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping("/demandeConge")
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequestDto leaveRequestDTO) {
        return leaveRequestService.createLeaveRequest(leaveRequestDTO);
    }

    @GetMapping("/user/{userId}")
    public List<LeaveRequestListUser> getLeaveRequestsByUser(@PathVariable Long userId) {
        return leaveRequestService.getLeaveRequestsByUser(userId);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<leaveRequestListAdmin>> getLeaveRequestsAdmin() {
        List<leaveRequestListAdmin> leaveRequests = leaveRequestService.getLeaveRequestsAdmin();
        return ResponseEntity.ok(leaveRequests);
    }

    @PutMapping("/{leaveRequestId}")  //****
    public LeaveRequest updateLeaveRequest(@PathVariable Long leaveRequestId, @RequestBody LeaveRequestDto leaveRequestDTO) {
        return leaveRequestService.updateLeaveRequest(leaveRequestId, leaveRequestDTO);
    }


    @DeleteMapping("/supprimer/{leaveRequestId}")
    public ResponseEntity<?> deleteLeaveRequest(@PathVariable Long leaveRequestId) {
        try {
            leaveRequestService.deleteLeaveRequest(leaveRequestId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur lors de la suppression.");
        }
    }

    @PutMapping("/accept/{leaveRequestId}")
    public ResponseEntity<Map<String, String>> acceptLeaveRequest(@PathVariable Long leaveRequestId) {
        try {
            leaveRequestService.updateLeaveRequestStatus(leaveRequestId, Statut.ACCEPTE);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Demande de congé acceptée avec succès.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erreur lors de l'acceptation de la demande : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/reject/{leaveRequestId}")
    public ResponseEntity<Map<String, String>> rejectLeaveRequest(@PathVariable Long leaveRequestId) {
        try {
            leaveRequestService.updateLeaveRequestStatus(leaveRequestId, Statut.REFUSE);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Demande de congé refusée avec succès.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erreur lors du refus de la demande : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
