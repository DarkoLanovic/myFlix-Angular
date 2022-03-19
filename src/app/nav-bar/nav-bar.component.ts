import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService }  from '../fetch-api-data.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // Routs user to movies page
  goToMoviePage(): void {
    this.router.navigate(['movies']);
  }

  // Routes user to profile page
  goToProfilePage(): void {
    this.router.navigate(['profile']);
  }

  // Logs the user out, clear the local storage and go back to welcome page
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }

}
