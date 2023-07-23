import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreComponent } from './genre.component';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreComponent]
    });
    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
