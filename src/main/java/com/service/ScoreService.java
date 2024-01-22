package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.ScoreDao;
import com.entity.Score;

@Service
public class ScoreService {
	
	@Autowired
	private ScoreDao scoreDao;
	public void saveScore(String email,int score) {
		
		try {
			Score s=new Score();
			s.setEmail(email);
			s.setScore(score);
			this.scoreDao.save(s);
		}
		catch(Exception e) {
			e.printStackTrace();
			
		}
	}
	 public List<Score> getTop10Scores() {
	        return scoreDao.findTop10ByOrderByScoreAsc();
	    }
	public Score myTop(String email) {
		try {
			Optional<Score> s=this.scoreDao.findTopByEmailOrderByScoreAsc(email);
			if(s.isPresent()) {
				return s.get();
			}
			return null;
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
