package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.Score;
public interface ScoreDao extends JpaRepository<Score, Long> {

	List<Score> findTop10ByOrderByScoreAsc();
	Optional<Score> findTopByEmailOrderByScoreAsc(String email);
}
