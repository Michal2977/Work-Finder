package com.workfinder.service.impl;

import com.workfinder.dto.FavoriteJobDto;
import com.workfinder.entity.FavoriteJob;
import com.workfinder.entity.Job;
import com.workfinder.entity.User;
import com.workfinder.exception.FavoriteJobAlreadyExistsException;
import com.workfinder.mapper.FavoriteJobMapper;
import com.workfinder.repository.FavoriteJobRepository;
import com.workfinder.repository.JobRepository;
import com.workfinder.service.FavoriteJobService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteJobImpl implements FavoriteJobService {

    private final FavoriteJobRepository favoriteJobRepository;
    private final AuthServiceImpl authService;
    private final JobRepository jobRepository;

    public FavoriteJobImpl(FavoriteJobRepository favoriteJobRepository, AuthServiceImpl authService, JobRepository jobRepository) {
        this.favoriteJobRepository = favoriteJobRepository;
        this.authService = authService;
        this.jobRepository = jobRepository;
    }


    @Override
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYER','EMPLOYEE')")
    public FavoriteJobDto saveFavoriteJob(String email, Long id){

        User user = authService.findByEmail(email);
        Job job = jobRepository.findById(id).get();

        FavoriteJob favoriteJob = new FavoriteJob();
        favoriteJob.setUser(user);
        favoriteJob.setJob(job);

        if (favoriteJobRepository.existsByUserIdAndJobId(user.getId(),job.getId())){
         throw new FavoriteJobAlreadyExistsException("Job is already saved");
        }

        favoriteJobRepository.save(favoriteJob);
        return FavoriteJobMapper.favoriteJobDto(favoriteJob);
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYER','EMPLOYEE')")
    @Override
     public List<FavoriteJobDto> findMySavedJobsOffers(String email){
        User user = authService.findByEmail(email);
       return favoriteJobRepository.findMySavedJobs(user.getId()).stream().map(FavoriteJobMapper :: favoriteJobDto)
               .toList();

   }

   @Override
   @PreAuthorize("hasAnyRole('EMPLOYER','EMPLOYEE','ADMIN')")
   public void deleteJobOfferFromFavorite(Long id){
        favoriteJobRepository.deleteById(id);
   }

   @Override
   @PreAuthorize("hasAnyRole('EMPLOYER','EMPLOYEE','ADMIN')")
   public long countMySavedJobs(String email){
        User user =  authService.findByEmail(email);
       return favoriteJobRepository.countMySavedJobs(user.getId());

   }
}
