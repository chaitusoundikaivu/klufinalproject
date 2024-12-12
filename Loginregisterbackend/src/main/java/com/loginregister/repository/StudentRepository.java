package com.loginregister.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.loginregister.entity.Student;



@Repository
public interface StudentRepository extends CrudRepository<Student,Long>{

}