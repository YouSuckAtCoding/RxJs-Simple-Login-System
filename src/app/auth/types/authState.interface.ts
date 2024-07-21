import { CurrentUserInterface } from "../../shared/types";
import { BackendErrorsInterface } from "./backenderrors.interface";

export interface AuthStateInterface {
    isSubmitting: boolean,
    currentUser: CurrentUserInterface | null | undefined,
    isLoading: boolean,
    validationErrors: BackendErrorsInterface | null
}