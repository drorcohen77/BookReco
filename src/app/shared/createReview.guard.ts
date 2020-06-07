
import { Injectable } from "@angular/core";
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Variables } from './variables';
import { Observable } from 'rxjs';


@Injectable()

export class createReviewGuard implements CanActivate {


    constructor(private route: Router, private variables: Variables ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean   {

        // if(!this.variables.logedIn) {
            this.route.navigate(['/home/booklist']);
            // return false;
        // }
        return true;
    }
}