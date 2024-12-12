package com.loginregister.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.loginregister.entity.Users;
@Repository
public interface UserRepo extends JpaRepository<Users,String>{

}
