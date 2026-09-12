package com.workfinder.mapper;

import com.workfinder.dto.FavoriteJobDto;
import com.workfinder.entity.FavoriteJob;

public class FavoriteJobMapper {
    public static FavoriteJobDto  favoriteJobDto(FavoriteJob favoriteJob){
        return new FavoriteJobDto(favoriteJob.getId(), JobMapper.jobDto(favoriteJob.getJob()));
    }
}
