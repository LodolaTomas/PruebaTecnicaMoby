import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  islogged:boolean = false;
  constructor(private router:Router,private authSrv:AuthService) { }

  ngOnInit(): void {
    this.authSrv.isUserLoggedIn.subscribe({
      next: (isLogged) => {
        this.islogged = isLogged;
      }
    })
  }

  redirectTo(path:string):void{
    this.router.navigate([path]);
  }

  logOut():void{
    this.authSrv.logOut();
  }

}
