import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/interface/user.interface';
import { UserType } from '../models/types/user.type';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  defaultUsers: User[] = [
    {
      email: 'jramonda@gmail.com',
      name: 'juan ramonda',
      password: '123456',
    },
    {
      email: 'afranco@gmail.com',
      name: 'alejandro franco',
      password: '123456',
    },
  ];
  public user: UserType = this.getUser();
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {
    this.isLogged();
  }

  getUser(): UserType {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
  }

  setUser(user: UserType): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  logIn(value: User): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this.defaultUsers.some((user) => this.isEqual(user, value))) {
        this.setUser(value);
        this.isUserLoggedIn.next(true);
        observer.next(true);
      }
      observer.next(false);
    });
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.user = null;
    this.isUserLoggedIn.next(false);
  }

  isEqual<T>(...objects: Array<T>): boolean {
    return objects.every(
      (obj) => JSON.stringify(obj) === JSON.stringify(objects[0])
    );
  }

  isLogged() {
    this.isUserLoggedIn.next(this.user ? true : false);
  }
}
