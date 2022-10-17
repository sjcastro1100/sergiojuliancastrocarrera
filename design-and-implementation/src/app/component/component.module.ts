import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



@NgModule({
  declarations: [MovieDetailComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [MovieDetailComponent]
})
export class ComponentModule { }
