package com.workfinder.scheduler;

import com.workfinder.service.JobsService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobScheduler {

    private final JobsService jobsService;

    @Scheduled(cron = "0 0 3 * * *")
    public void deleteOldJobs(){
        jobsService.deleteOldSoftDeletedJobs();
    }



}
