package com.reactspring.emsbackend.controller;

import com.reactspring.emsbackend.dto.EmployeeDto;
import com.reactspring.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;
//    Build Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

//    Build Get Employee Rest Api
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeId(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }
// Get All employees rest Api

// public String getMethodName(@RequestParam String param) {
//     return new String();
// }
@GetMapping
public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
    List<EmployeeDto> employees = employeeService.getAllEmployee();
    return ResponseEntity.ok(employees);
}

// Build Update employee rest api
@PutMapping("{id}")
public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
@RequestBody EmployeeDto updatedEmployee){
    EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updatedEmployee);
    return ResponseEntity.ok(employeeDto);


}

// Build Delete Rest APi
@DeleteMapping("{id}")
public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
    employeeService.deleteEmployee(employeeId);
    return ResponseEntity.ok("Employee deleted successfully!");
}

}
