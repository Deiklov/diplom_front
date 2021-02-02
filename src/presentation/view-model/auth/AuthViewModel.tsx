import BaseViewModel from "../BaseViewModel";

// Интерфейс ViewModel, который будет доступен View. Здесь
// объявлены все публичные поля, которые будет использовать View
export default interface AuthViewModel extends BaseViewModel {
    emailQuery: string;
    passwordQuery: string;
    isSignInButtonVisible: boolean;
    isSignOutButtonVisible: boolean;

    isShowError: boolean;
    errorMessage: string;

    authStatus: string;
    isAuthStatusPositive: boolean;

    onEmailQueryChanged(loginQuery: string): void;

    onPasswordQueryChanged(passwordQuery: string): void;

    onClickSignIn(): void;

    onClickSignOut(): void;
}