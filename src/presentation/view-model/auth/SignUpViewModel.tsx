import BaseViewModel from '../BaseViewModel';

export default interface SignupViewModel extends BaseViewModel {
    emailQuery: string;
    nameQuery: string;
    passwordQuery: string;
    ageQuery: string;
    loginQuery: string;

    authStatus: string;

    onEmailQueryChanged(emailQuery: string): void;

    onLoginQueryChanged(loginQuery: string): void;

    onNameQueryChanged(nameQuery: string): void;

    onPasswordQueryChanged(passwordQuery: string): void;

    onPasswordConfirmQueryChanged(passwordQuery: string): void;

    onAgeQueryChanged(ageQuery: string): void;

    onClickSubmit(): void;
}
