import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_modals/users';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  isLoggedin: boolean;

  constructor(public acountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);
    this.acountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  Logout() {
    this.acountService.logout();
  }

}
