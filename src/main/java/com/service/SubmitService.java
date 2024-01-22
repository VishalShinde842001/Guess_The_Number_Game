package com.service;

import org.springframework.stereotype.Service;

import com.helper.SubmitHelper;

@Service
public class SubmitService {
	
	public SubmitHelper checker(int userInput,int expected) {
		if(userInput==expected) {
			System.out.println("Correct");
			return new SubmitHelper("Correct Input",true);
		}
		else if(userInput<expected) {
			System.out.println("Your input is smaller than Expected");
			return new SubmitHelper("Your input is smaller than Expected",false);
		}
		else {
			System.out.println("Your input is Bigger than Expected");
			return new SubmitHelper("Your input is Bigger than Expected",false);
		}
	}

}
