import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://visionary-film-club.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export default class UserRegistrationService {

  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the "User registration" endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the "User login" endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Get all Movies" endpoint
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Get one movie" endpoint
  getSingleMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:Title').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Get Director" endpoint
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/:Name').pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the "Get Genre" endpoint
  getGendre(): Observable<any> {
    return this.http.get(apiUrl + 'genre/:Name').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Get User" endpoint
  getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + 'users/:Username').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Add Favorite Movie" endpoint
  addfavoriteMovie(MovieID: any): Observable<any> {
    return this.http.post(apiUrl + 'users/:Username/FavoriteMovies/:MovieID', null).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Delete Favorite Movie" endpoint
  deleteFavoriteMovie(MovieID: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/:Username/FavoriteMovies/:MovieID').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Edit User Profile" endpoint
  editUserProfile(UserCredential: object): Observable<any> {
    return this.http.put(apiUrl + 'users/:Username', UserCredential).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the "Delete User Profile" endpoint
  public deleteUserProfile(): Observable<any> {
    return this.http.delete(apiUrl + 'users/:Username').pipe(
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}