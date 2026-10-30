package com.workfinder.controller;

import com.workfinder.exception.FavoriteJobAlreadyExistsException;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.FavoriteJobImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FavoriteJobController {

    private final FavoriteJobImpl favoriteJob;

    public FavoriteJobController(FavoriteJobImpl favoriteJob) {
        this.favoriteJob = favoriteJob;
    }


    @PostMapping("/save-job/{id}")
    public ResponseEntity<?> saveJobOffer(Authentication authentication, @PathVariable("id")Long id){
        try {
            favoriteJob.saveFavoriteJob(authentication.getName(),id);
            return ResponseEntity.ok().body(new ApiResponse("Job added to favorites"));
        }catch (FavoriteJobAlreadyExistsException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }

    }

    @GetMapping("/saved-jobs")
    public ResponseEntity<?> findAllSavedJobsByUser(Authentication authentication){
        return ResponseEntity.ok(favoriteJob.findMySavedJobsOffers(authentication.getName()));
    }

    @DeleteMapping("/delete-favorite/{id}")
    public ResponseEntity<?> deleteJobOfferFromFavorite(@PathVariable("id")Long id){
        favoriteJob.deleteJobOfferFromFavorite(id);
         return ResponseEntity.ok().build();

    }
    @GetMapping("/amount-of-favorite-jobs")
    public ResponseEntity<?> countMyFavoriteJobsOffers(Authentication authentication){
        return ResponseEntity.ok(favoriteJob.countMySavedJobs(authentication.getName()));
    }

}
