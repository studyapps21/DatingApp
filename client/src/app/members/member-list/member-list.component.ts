import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_modals/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
    //console.log(this.members)
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members =>
      this.members = members
    )
  }

}
