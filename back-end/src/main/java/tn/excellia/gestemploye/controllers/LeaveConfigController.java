package tn.excellia.gestemploye.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.excellia.gestemploye.models.LeaveConfig;
import tn.excellia.gestemploye.services.LeaveConfigService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/leave-config")
public class LeaveConfigController {
    @Autowired
    private LeaveConfigService leaveConfigService;

    @GetMapping("/user/{userId}")
    public LeaveConfig getLeaveConfigByUser(@PathVariable Long userId) {
        return leaveConfigService.getLeaveConfigByUser(userId);
    }

}
