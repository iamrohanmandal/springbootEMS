package com.reactspring.emsbackend.service;

import java.util.List;

import com.reactspring.emsbackend.dto.EmployeeDto;
import com.reactspring.emsbackend.entity.Employee;
import com.reactspring.emsbackend.exception.ResourceNotFoundException;
import com.reactspring.emsbackend.mapper.EmployeeMapper;



public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployee();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
    void deleteEmployee(Long employeeId);
}
