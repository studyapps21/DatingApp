import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_modals/member';
import { PaginatedResult } from '../_modals/pagination';
import { User } from '../_modals/users';
import { Userparams } from '../_modals/usersParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  baseUrl = environment.apiUrl;
  memberCash = new Map();
  user: User;
  userParams: Userparams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new Userparams(user);
    });
  }

  // tslint:disable-next-line: typedef
  getUserParams() {
    return this.userParams;
  }

  // tslint:disable-next-line: typedef
  setUserParams(params: Userparams) {
    this.userParams = params;
  }

  // tslint:disable-next-line: typedef
  resetUserParams() {
    this.userParams = new Userparams(this.user);
    return this.userParams;
  }

  // tslint:disable-next-line: typedef
  getMembers(userParams: Userparams) {
    const response = this.memberCash.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedresult<Member[]>(this.baseUrl + 'users', params)
      .pipe(map(resp => {
        this.memberCash.set(Object.values(userParams).join('-'), resp);
      }));
  }

  // tslint:disable-next-line: typedef
  getMember(username: string) {
    const member = [...this.memberCash.values()]
      .reduce((arr, ele) => arr.concat(ele.result), [])
      .find((memb: Member) => memb.username === username);

    if (member) {
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // tslint:disable-next-line: typedef
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member)
      .pipe(map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      }));
  }
  // tslint:disable-next-line: typedef
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  // tslint:disable-next-line: typedef
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  // tslint:disable-next-line: typedef
  private getPaginatedresult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params })
      .pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
      );
  }

  // tslint:disable-next-line: typedef
  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }
}
