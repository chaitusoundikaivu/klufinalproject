package com.loginregister.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.loginregister.entity.Users;
import com.loginregister.request.LoginRequest;
import com.loginregister.service.UserService;

@RestController
public class UserController {

		@Autowired
		UserService userService;
	
		@PostMapping("/addUser")
		@CrossOrigin(maxAge=3360)
//		@CrossOrigin(origins="http://localhost:5173")
		public Users addUser(@RequestBody Users user) {
			return userService.addUser(user);
		}
		@PostMapping("/loginUser")
//		@CrossOrigin(origins="http://localhost:5173")
		@CrossOrigin(maxAge=3360)
		public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
			return userService.loginUser(loginRequest);
		}
		
		
}
