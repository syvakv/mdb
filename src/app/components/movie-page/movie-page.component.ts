import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {
  MovieDetail,
  Video,
  Movie,
  Genre,
  Recomendation,
} from 'src/app/interfaces/interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  videoUrl: SafeResourceUrl | undefined;
  video: Video[] | undefined;
  movie: MovieDetail | undefined;
  gen: Genre | undefined;
  movies: Recomendation[] = [];
  rec: Recomendation | undefined;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private _sanitizer: DomSanitizer
  ) {}

  //get movie info on page init
  ngOnInit(): void {
    this.videoUrl;
    this.video;
    this.isLoading;
    this.movie;
    this.rec;
    this.gen;

    let id = parseInt(this.route.snapshot.paramMap.get('id') || '{}');
    this.isLoading = true;
    this.apiService.getMovieDetail(id).subscribe((result) => {
      this.movie = result;
    });

    this.apiService.getMovieRecomendation(id).subscribe((data) => {
      this.movies = data.results;
    });

    // load youtube not working(
    this.apiService.getMovieTrailer(id).subscribe(
      (data) => {
        this.isLoading = false;
        this.video = data.results;

        this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.video[0].key}`
        );
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  goHome() {
    this.router.navigate(['']);
  }
}
