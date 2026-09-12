package com.workfinder.service;

import com.workfinder.dto.FavoriteJobDto;

import java.util.List;

public interface FavoriteJobService {
    FavoriteJobDto saveFavoriteJob(String email, Long id);
    List<FavoriteJobDto> findMySavedJobsOffers(String email);
    void deleteJobOfferFromFavorite(Long id);
    long countMySavedJobs(String email);
}
