import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.service';
import { Variables } from 'src/app/shared/variables';
import { AppPlaceholderDirective } from '../../shared/app_placeholder.directive';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild(AppPlaceholderDirective, {static: false}) loginHost: AppPlaceholderDirective;

  public error: string = null;
  private close: Subscription;

  constructor(
              private authService: AuthService, 
              public variables: Variables,
              private compFactoryResolver: ComponentFactoryResolver,
              private toastr: ToastrService,
            ) { }

  ngOnInit() {
  }


  public onSubmit(form: NgForm) {
    this.variables.LoadSpiner = true;
    
    if(!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const userName = form.value.UserName;

    this.authService.singup(email, password, userName).subscribe(
      (resData) => {
        this.variables.LoadSpiner = false;
        this.toastr.success('You Have Been Successfuly Registered!');
        this.authService.fromRegister = true;
        this.logIn();
      },
      (error) => {
        this.error = error;
        this.variables.LoadSpiner = false;
      }
    );
    // this.variables.register = true;
    this.error = null;
    form.reset();
  }

  private logIn() {
    
    const loginCmpFactory = this.compFactoryResolver.resolveComponentFactory(LoginComponent);

    const hostviewContainerRef = this.loginHost.viewContainerRef;
    hostviewContainerRef.clear();
    const compRef = hostviewContainerRef.createComponent(loginCmpFactory);
    this.close = compRef.instance.close.subscribe(() => {
      this.close.unsubscribe();
      hostviewContainerRef.clear();
    });
  }

}
