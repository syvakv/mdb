import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { fromEvent } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  tap,
  filter,
} from 'rxjs/operators';
import { Movie } from 'src/app/interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('search')
  searchInput!: ElementRef;

  suggestions: Movie[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngAfterViewInit() {
    // Api cal search
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => {
          if (res.length > 2) {
            return true;
          } else {
            this.suggestions = [];
            return false;
          }
        }),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.handleSearch(this.searchInput.nativeElement.value);
        })
      )
      .subscribe();
  }

  handleSearch(searchInput: string) {
    this.apiService.searchMovies(searchInput).subscribe((data) => {
      this.suggestions = data.results;
    });
  }

  onSelect(suggestion: Movie) {
    this.router.navigate(['/movie', suggestion.id]);
  }
}
