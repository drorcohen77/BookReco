
import { Injectable } from "@angular/core";
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Variables } from './variables';
import { AuthService } from '../auth/auth.service';


@Injectable()

export class createReviewGuard implements CanActivate {


    constructor(private route: Router, private variables: Variables, private authService: AuthService ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean   {

        if(!this.authService.logedIn) {
            this.route.navigate(['/main/home/booklist']);
            return false;
        }
        return true;
    }
}