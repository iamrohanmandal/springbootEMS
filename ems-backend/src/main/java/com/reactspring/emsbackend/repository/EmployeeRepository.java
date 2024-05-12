package com.reactspring.emsbackend.repository;
import com.reactspring.emsbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// @Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
