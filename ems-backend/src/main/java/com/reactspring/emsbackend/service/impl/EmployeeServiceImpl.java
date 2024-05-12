package com.reactspring.emsbackend.service.impl;

import com.reactspring.emsbackend.dto.EmployeeDto;
import com.reactspring.emsbackend.entity.Employee;
import com.reactspring.emsbackend.exception.ResourceNotFoundException;
import com.reactspring.emsbackend.mapper.EmployeeMapper;
import com.reactspring.emsbackend.repository.EmployeeRepository;
import com.reactspring.emsbackend.service.EmployeeService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Does not exist with the given Id : " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee>employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
        .collect(Collectors.toList())
        ;
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
            () -> new ResourceNotFoundException("Employee not found with given od : " + employeeId)
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        
        Employee updateEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updateEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
            () -> new ResourceNotFoundException("Employee not found with given od : " + employeeId)
        );
        employeeRepository.deleteById(employeeId);
    }
}
