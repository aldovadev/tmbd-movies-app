import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MovieApiService } from './movie-api-service.service';

describe('MovieApiService', () => {
  let service: MovieApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, // Add HttpClientModule to the imports of TestBed configuration
      ],
      providers: [MovieApiService],
    });
    service = TestBed.inject(MovieApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


