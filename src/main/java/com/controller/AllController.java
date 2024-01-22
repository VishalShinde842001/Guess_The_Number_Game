package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Login;
import com.entity.Register;
import com.entity.Score;
import com.helper.SubmitHelper;
import com.service.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("http://localhost:4200")
public class AllController {
	// Registration process
	@Autowired
	private RegisterService registerService;
	private HttpSession httpSession;

	@Autowired
	private SubmitService submitService;

	@Autowired
	private ScoreService scoreService;

	@PostMapping("/register")
	public ResponseEntity<Boolean> register(@RequestBody Register register) {
		boolean b = this.registerService.register(register);
		if (b) {
			return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.ALREADY_REPORTED);

	}

	@RequestMapping("/login")
	public boolean login(@RequestBody Login login, HttpServletRequest request) {

		boolean l = this.registerService.login(login);
		if (l) {
			httpSession = request.getSession();
			httpSession.setAttribute("email", login.getEmail());
			System.out.println("Email Saved in session:" + httpSession.getAttribute("email"));
			return true;
		}
		return false;
	}

	@RequestMapping("/start")
	public boolean start() {
		try {
			if (httpSession == null) {
				System.out.println("Session is null");
				return false;
			}
			int random = generateRandomNumber();
			httpSession.setAttribute("random", random);
			httpSession.setAttribute("count", 0);
			System.out.println("Random Number:" + httpSession.getAttribute("random"));
			System.out.println("Email:" + httpSession.getAttribute("email"));
			return true;
		} catch (Exception e) {
			System.out.println(e);
			return false;
		}

	}

	@GetMapping("/quit")
	public boolean quit() {
		try {
			if (httpSession == null) {
				System.out.println("Session is null");
				return false;
			}

			httpSession.removeAttribute("random");
			httpSession.setAttribute("count", -1);

			return true;
		} catch (Exception e) {
			System.out.println(e);
			return false;
		}

	}

	public int generateRandomNumber() {
		// To create Random number between 1 to 100
		return (int) (Math.random() * 100) + 1;
	}

	@GetMapping("/submit/{num}")
	public ResponseEntity<SubmitHelper> submit(@PathVariable int num) {
		try {
			/*
			 * if (httpSession == null) { return new ResponseEntity<SubmitHelper>(new
			 * SubmitHelper("Session is Null Login and Start Game", false),
			 * HttpStatus.INTERNAL_SERVER_ERROR); } if (httpSession.getAttribute("random")
			 * == null) { return new ResponseEntity<SubmitHelper>(new
			 * SubmitHelper("Session is Null Login and Start Game", false),
			 * HttpStatus.INTERNAL_SERVER_ERROR); }
			 */
			System.out.println("Email is submit:" + httpSession.getAttribute("email"));
			int random = (int) httpSession.getAttribute("random");
			SubmitHelper s = this.submitService.checker(num, random);
			int count = (int) httpSession.getAttribute("count");
			httpSession.setAttribute("count", count + 1);
			if (s.isInput_status()) {
				System.out.println(httpSession.getAttribute("count"));
				int score = (int) this.httpSession.getAttribute("count");
				String email = (String) this.httpSession.getAttribute("email");
				this.scoreService.saveScore(email, score);

				return new ResponseEntity<SubmitHelper>(s, HttpStatus.ACCEPTED);

			}

			return new ResponseEntity<SubmitHelper>(s, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<SubmitHelper>(new SubmitHelper("Some error occured", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/score")
	public int myScore() {
		try {
			if (httpSession == null) {
				System.out.println("Session is null in score method");
				return -1;
			}
			int score = (int) this.httpSession.getAttribute("count");
			return score;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@GetMapping("/myTop")
	public Score myTop() {
		try {
			if (httpSession == null) {
				return null;
			}
			String email = (String) httpSession.getAttribute("email");
			return this.scoreService.myTop(email);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("/toppers")
	public List<Score> toppers() {
		return this.scoreService.getTop10Scores();
	}

	@GetMapping("/logout")
	public boolean logout() {
		try {
			System.out.println("Log out called");

			if (httpSession != null) {
				httpSession.invalidate();
			}
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
