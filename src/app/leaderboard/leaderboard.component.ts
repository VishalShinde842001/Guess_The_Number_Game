import { Component, OnInit } from '@angular/core';
import { LeaderboardService, Score } from '../leaderboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  topScorers: Score[] = [];

  constructor(private leaderboard: LeaderboardService) { }

  ngOnInit(): void {
    this.loadTopScorers();
  }

  loadTopScorers(): void {
    this.leaderboard.getTopScorers().subscribe(
      data => {
        this.topScorers = data;
      },
      error => {
        console.error('Error fetching top scorers:', error);
      }
    );
  }
}
