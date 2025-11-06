package tn.excellia.gestemploye.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.excellia.gestemploye.models.LeaveConfig;
import tn.excellia.gestemploye.repositories.LeaveConfigRepository;

@Service
public class LeaveConfigServiceImpl implements LeaveConfigService {

    @Autowired
    private LeaveConfigRepository leaveConfigRepository;

    @Override
    public LeaveConfig getLeaveConfigByUser(Long userId) {
        return leaveConfigRepository.findById(userId).orElseThrow();
    }
}
