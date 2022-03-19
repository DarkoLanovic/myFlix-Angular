import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  UserFromStorage: any = localStorage.getItem('user');
  currentUser: any = (JSON.parse(this.UserFromStorage));
  currentUsername: any = this.currentUser.Username;
  currentFavs: any = this.currentUser.Favorites;
  favsEmpty: boolean = true;

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser(this.currentUsername);
  }

  getCurrentUser(currentUser: string): void {
    this.fetchApiData.getUser(currentUser).subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = this.currentUser.Favorites;
      this.areFavsEmpty();
      return this.currentUser;
    });
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  openUserEditDialog(
    username: string,
    password: string,
    email: string,
    birthday: Date
  ): void {
    this.dialog.open(UserEditComponent, {
      data: {
        username,
        password,
        email,
        birthday
      },
      width: '320px'
    });
  }

  openRemoveUserDialog(): void {
    this.dialog.open(RemoveUserComponent, {
      width: '320px'
    });
  }

  removeFromFavs(movieId: string): void {
    this.fetchApiData.removeFromFavs(this.currentUsername, movieId).subscribe((resp: any) => {
      this.ngOnInit();
      this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
    });
    this.ngOnInit();
  }

  //checking whether favs are empty to create a boolean var for conditional rendering of "empty favs" message
  areFavsEmpty(): any {
    if (this.currentFavs.length == 0) {
      this.favsEmpty = true;
    } else {
      this.favsEmpty = false;
    }
    return this.favsEmpty;
  }
}
