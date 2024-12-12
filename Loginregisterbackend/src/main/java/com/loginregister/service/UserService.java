package com.loginregister.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loginregister.entity.Users;
import com.loginregister.repository.UserRepo;
import com.loginregister.request.LoginRequest;

@Service
public class UserService {
	@Autowired
	UserRepo userRepo;
	public Users addUser(Users user) {
		
		return userRepo.save(user);
	}
	public boolean loginUser(LoginRequest loginRequest) {
		Optional<Users> user=userRepo.findById(loginRequest.getUserId());
		
		if(user == null) {
			return false;
			
		}
		Users user1=user.get();
		if(!user1.getPassword().equals(loginRequest.getPassword())) {
			return false;
		}
		return true;
	}
}
