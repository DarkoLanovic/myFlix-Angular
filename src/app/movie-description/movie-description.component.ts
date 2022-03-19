import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})

export class MovieDescriptionComponent implements OnInit {

  constructor(

    // Uses inject to get the movie details from the movie object
    @Inject(MAT_DIALOG_DATA)
      public data: {
        Title: string,
        ImagePath: any,
        Description: string,
        Genre: string
    } 
  ) { }

  ngOnInit(): void {
  }
}
