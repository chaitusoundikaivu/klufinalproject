package com.loginregister.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.loginregister.entity.Student;
import com.loginregister.service.StudentService;



@CrossOrigin(maxAge=3360)
@RestController
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@GetMapping("/students")
	public ResponseEntity<List<Student>> getStudents()
	{
		return ResponseEntity.ok(studentService.getStudents());
	}
	
	@GetMapping("/students/{studentId}")
	public ResponseEntity<Student> getStudent(@PathVariable("studentId") Long studentId)
	{
		return ResponseEntity.ok(studentService.getStudentById(studentId));
	}
	
	@PostMapping("/students")
	public ResponseEntity<Student> addStudent(@RequestBody Student student)
	{
		return ResponseEntity.ok(studentService.addStudent(student));
	}
	
	@PatchMapping("/students/{studentId}")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student,@PathVariable("studentId") Long studentId)
	{
		return ResponseEntity.ok(studentService.updateStudent(student));
	}
	@DeleteMapping("/students/{studentId}")
	public ResponseEntity<String> deleteStudent(@PathVariable("studentId") Long studentId)
	{
		Student stdObj=studentService.getStudentById((studentId));
		String deleteMsg=null;
		if(stdObj!=null) {
			deleteMsg=studentService.deleteStudent(stdObj);
		}
		return ResponseEntity.ok(deleteMsg);
	}
}