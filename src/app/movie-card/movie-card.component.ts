import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  username: any = localStorage.getItem('username');
  currentUser: any = null;
  currentFavs: any = null;
  isInFavs: boolean = false;
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Gets movies when initialized 
   */
  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = resp.Favorites;
      return (this.currentUser, this.currentFavs);
    });
  }

   /**
   * Get users favorite movies
   */
    getFavs(): void {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.favs = resp.FavoriteMovies;
        console.log(this.favs);
        return this.favs;
      });
    }

     /**
   * Deletes a favorite movie
   * @param id 
   */
  handleUnfavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe(() => {
      this.getFavs();
    })
  }


  /**
   * Get all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Get users favorite movies
   */
   
  /**
   * Open the director component to view info
   * @param name 
   * @param bio 
   * @param birth 
   */
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }

  /**
   * Open the genre component to view info
   * @param name 
   * @param description 
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * Open the synopisis component to view info
   * @param title 
   * @param imagePath 
   * @param description 
   */
  OpenMovieDescription(title: string, imagePath: any, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }
  
  toggleFavs(movieId: string): void {
    console.log(movieId);
    if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.removeFromFavs(movieId);
      this.isInFavs = false;
    } else {
      this.addToFavs(movieId)
      this.isInFavs = true;
    }
  }

    /**
   * Checks if movie if favorited
   * @param id 
   * @returns 
   */
     isFavorited(id: string): boolean {
       console.log(this.favs);
      return this.favs.includes(id);
    }

     /**
   * Adds a favorite movie
   * @param id 
   */
  handleFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.getFavs();
    })
  }

  

  addToFavs(movieId: string): void {
    console.log(movieId)
    //checking if the title is already in favs
    if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.snackBar.open('Already in your favs', 'OK', { duration: 2000 });
      return
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
        this.getCurrentUser();
        this.ngOnInit();
        this.snackBar.open('Added to favs', 'OK', { duration: 2000 });
      });
    }
  }

  removeFromFavs(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovies(movieId).subscribe((resp: any) => {
      this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
      this.getCurrentUser();
      this.ngOnInit();
      2000
    });
  }

  favCheck(movieId: string): any {
    let favIds = this.currentFavs.map(function (fav: any) { return fav._id });
    if (favIds.includes(movieId)) {
      this.isInFavs = true;
      return this.isInFavs;
    };
  }
}