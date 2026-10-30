package com.workfinder.mapper;

import com.workfinder.dto.EmployerDto;
import com.workfinder.entity.Employer;

public class EmployerMapper {
    public static EmployerDto employerDto(Employer employer){

        return new EmployerDto(employer.getId(),employer.getFirstName(), employer.getLastName(),
                employer.getCompanyName(), employer.getNip(),employer.getPhoneNumber());
    }
}
