import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import FetchApiDataService from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

export class UserLoginFormComponent implements OnInit {
  
   //get input info and store it in userCredentials
   
  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  /**
   * Login user via input field by using API endpoint
   * And store the users data in localstorage
   * @function userLogin
   * @param loginData {object}
   * @return users data in json format
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (response: any) => {
        console.log(response);
        // This will close the modal on success
        this.dialogRef.close(); 
        this.snackBar.open('You are logged in', 'OK', {
          duration: 2000,
        });

      },
      (response: any) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}