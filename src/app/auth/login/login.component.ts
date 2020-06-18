import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Variables } from 'src/app/shared/variables';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as AuthAction from '../store/auth.action';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error: string;

  @Output() close = new EventEmitter<void>();

  public email: string;
  public password: string;

  constructor(
    private authService: AuthService, 
    public variables: Variables, 
    private toastr: ToastrService,
    private nav: Router,
    private store: Store<{ auth }>
    ) { }

  ngOnInit() {
  }


  public logIn() {

    // this.store.dispatch(
    //   new AuthAction.Login_Start({ email: this.email, password: this.password })
    // );
    this.authService.logIn(this.email,this.password).subscribe(
      () => {
        this.authService.logedIn = true;
        this.toastr.success('You Have Been Successfuly Loged-In!')
        this.onClose();

        if(this.authService.fromRegister) {
          this.nav.navigate(['/main/home/booklist']);
        }
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }

  public onClose() {
    this.authService.logedIn = true;
    this.close.emit();
  }

}
