package com.loginregister.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loginregister.entity.Student;
import com.loginregister.repository.StudentRepository;



@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	private StudentRepository studentRepository;
	
	@Override
	public List<Student> getStudents() {
		
		return (List<Student>) studentRepository.findAll();
	}

	@Override
	public Student getStudentById(Long studentId) {
		
		return studentRepository.findById(studentId).get();
	}

	@Override
	public Student addStudent(Student student) {
		
		return studentRepository.save(student);
	}

	@Override
	public Student updateStudent(Student student) {
		return studentRepository.save(student);
	}

	@Override
	public String deleteStudent(Student student) {
		 studentRepository.delete(student);
		 return "Student is Deleted successfully for the Studentid"+student.getStudentId();
	}

	


	

}