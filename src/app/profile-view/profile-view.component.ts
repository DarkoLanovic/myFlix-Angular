import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FetchApiDataService }  from '../fetch-api-data.service';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {
  user: any = localStorage.getItem('username');
  favs: any = null ;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {
    
   }

  /**
   * Gets user profile when the page is opened
   */
  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Gets user info from backend
   */
  getUserProfile(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
      this.getFavs();
    });
  }

  /**
   * Opens dialog to edit user information
   */
  openEditUserProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px'
    });
  }

  /**
   * Filters out movies that aren't in favs
   */
  getFavs(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favs = res.filter((movie: any) => {
        return this.user.FavoriteMovies.includes(movie._id)
      });
      console.log(this.favs);
      return this.favs;
    })
  }

  /**
   * Allows user to remove movie from favs
   * @param id 
   */
  removeFav(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favs;
    })
  }

  /**
   * Allows user to delete their profile
   * Re-routes to the welcome page
   */
  deleteProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe(
        () => {
          this.snackBar.open('Your account was deleted', 'OK', {
            duration: 3000
          });
          localStorage.clear();
        },
        () => {
          this.router.navigate(['welcome']).then(() => {
          window.location.reload();
        });
      })
    };
  }
}