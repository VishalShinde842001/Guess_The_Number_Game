package com.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Register;

public interface RegisterDao  extends JpaRepository<Register, String>{

}
