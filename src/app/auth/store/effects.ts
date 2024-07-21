import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.services";
import { AuthActions } from "./actions";
import { CurrentUserInterface } from "../../shared/types";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "../../shared/services/persistance.service";
import { Router } from "@angular/router";

export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)) => {

    return actions$.pipe(
        ofType(AuthActions.register),
        switchMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistanceService.set('accessToken', currentUser.token)
                    return AuthActions.registerSuccess({ currentUser }); 
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(AuthActions.registerFailure({errors: errorResponse.error.errors}))
                })
            )
        }
        )
    )
}, { functional: true })


export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(AuthActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/')
            } )
        )
    },
    {functional: true, dispatch: false}
)