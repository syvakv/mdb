import { Component, OnInit } from '@angular/core';
import { Movie, MovieDetail } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  movie: MovieDetail | undefined;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.apiService.getMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }

  onSelect(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMovies();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMovies();
  }
}
