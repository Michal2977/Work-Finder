package com.workfinder.mapper;

import com.workfinder.dto.EmployerDto;
import com.workfinder.entity.Employee;
import com.workfinder.entity.Employer;

import java.util.Base64;

public class EmployerMapper {
    public static EmployerDto employerDto(Employer employer){
        String base64Picture = null;
        if (employer.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(employer.getPicture());
        }
        return new EmployerDto(employer.getFirstName(), employer.getLastName(),
                employer.getCompanyName(), employer.getNip(), employer.getPhoneNumber(),base64Picture);
    }
}
