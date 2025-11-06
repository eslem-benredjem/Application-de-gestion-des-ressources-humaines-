package tn.excellia.gestemploye.services;

import tn.excellia.gestemploye.models.LeaveConfig;

public interface LeaveConfigService {
    LeaveConfig getLeaveConfigByUser(Long userId);
}
