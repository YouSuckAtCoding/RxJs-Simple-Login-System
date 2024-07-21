import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthActions } from "./actions";
import { AuthStateInterface } from "../types/authState.interface";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validationErrors: null
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(AuthActions.register, (state) => ({
            ...state, isSubmitting: true,
            validationErrors: null
        })),
        on(AuthActions.registerSuccess, (state, action) => ({
            ...state, isSubmitting: false,
            currentUser: action.currentUser
        })),
        on(AuthActions.registerFailure, (state, action) => ({
            ...state, isSubmitting: false,
            validationErrors: action.errors
        }))
    )
})

export const { name: authFeatureKey, reducer: authReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectCurrentUser,
    selectValidationErrors } = authFeature