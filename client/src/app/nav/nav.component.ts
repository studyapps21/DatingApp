import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  user: string;

  constructor(public acountService: AccountService,
    private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);
    this.acountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/members');
    })
  }

  Logout() {
    this.acountService.logout();
    this.router.navigateByUrl('/')
  }

}
