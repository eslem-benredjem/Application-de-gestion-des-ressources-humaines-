package tn.excellia.gestemploye.services;

import tn.excellia.gestemploye.dtos.LeaveRequestDto;
import tn.excellia.gestemploye.dtos.LeaveRequestListUser;
import tn.excellia.gestemploye.dtos.leaveRequestListAdmin;
import tn.excellia.gestemploye.models.LeaveRequest;
import tn.excellia.gestemploye.models.Statut;
import tn.excellia.gestemploye.models.User;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRequestService {
    LeaveRequest createLeaveRequest(LeaveRequestDto leaveRequestDTO);
    List<LeaveRequestListUser> getLeaveRequestsByUser(Long userId);
    List<leaveRequestListAdmin> getLeaveRequestsAdmin();
    LeaveRequest updateLeaveRequest(Long leaveRequestId, LeaveRequestDto leaveRequestDTO);
    void deleteLeaveRequest(Long leaveRequestId);
    void updateLeaveRequestStatus(Long leaveRequestId, Statut status);
    double calculateLeaveBalance(User user);
    long calculateDuration(LocalDate startDate, LocalDate endDate);
}
