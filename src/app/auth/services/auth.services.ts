import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "../../shared/types";
import { AuthResponseInterface } from "../types/auth.response.interface";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient){}

    register(data: RegisterRequestInterface) : Observable<CurrentUserInterface>
    {
        const url = environment.apiUrl + 'users';
        return this.http.post<AuthResponseInterface>(url, data)
        .pipe(map((response) => response.user));
    }
}
