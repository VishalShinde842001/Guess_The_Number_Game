package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.RegisterDao;
import com.entity.Login;
import com.entity.Register;


@Service
public class RegisterService {
	
	@Autowired
	private RegisterDao registerDao;
	public boolean register(Register register) {
		try {
			Register r=this.findById(register.getEmail());
			if(r==null) {
				this.registerDao.save(register);
				return true;
			}
			return false;
		}
		catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public Register findById(String email) {
		try {
			Optional<Register> r=this.registerDao.findById(email);
			if(r.isPresent()) {
				return r.get();
			}
			return null;
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public boolean login(Login login) {
		Register r=this.findById(login.getEmail());
		if(r==null) {
			return false;
		}
		if(r.getPassword().equals(login.getPassword())) {
			return true;
		}
		return false;
	}
}
