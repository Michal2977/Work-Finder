package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteJobDto {

    private Long id;
    private JobDto jobDto;


    public FavoriteJobDto() {
    }

    public FavoriteJobDto(Long id,JobDto jobDto) {
        this.id = id;
        this.jobDto = jobDto;
    }
}
