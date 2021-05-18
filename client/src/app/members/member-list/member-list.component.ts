import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_modals/member';
import { Pagination } from 'src/app/_modals/pagination';
import { User } from 'src/app/_modals/users';
import { Userparams } from 'src/app/_modals/usersParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: Userparams;
  user: User;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  // tslint:disable-next-line: typedef
  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  // tslint:disable-next-line: typedef
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  // tslint:disable-next-line: typedef
  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response?.result;
      this.pagination = response?.pagination;
    });
  }
}
