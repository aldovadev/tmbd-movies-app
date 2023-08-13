import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';
import { SearchComponent } from './modules/search/search.component';
import { CategoryComponent } from './modules/category/category.component';
import { GenreComponent } from './modules/genre/genre.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'genre/:id', component: GenreComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
