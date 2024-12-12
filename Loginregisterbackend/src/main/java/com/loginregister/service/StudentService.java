package com.loginregister.service;

import java.util.List;

import com.loginregister.entity.Student;



public interface StudentService {
	List<Student> getStudents();
	Student getStudentById(Long studentId);
	Student addStudent(Student student);
	Student updateStudent(Student student);
	String deleteStudent(Student student);

}