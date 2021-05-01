import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Users: any;
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get("https://localhost:5001/api/Users").subscribe(response => {
      this.Users = response;
    }, error => {
      console.log(error);
    });
  }

  constructor(private http: HttpClient) {
  }

  title = 'The Dating App.';
}
