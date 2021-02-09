import SignupViewModel from "./SignUpViewModel";
import LoginUseCase from "../../../domain/interactors/auth/LoginUseCase";
import BaseView from "../../view/BaseView";

export default class SignupViewModelImpl implements SignupViewModel {
    public ageQuery: string;
    public authStatus: string;
    public emailQuery: string;
    public nameQuery: string;
    public passwordQuery: string;
    public loginQuery: string;
    private loginUseCase: LoginUseCase;
    private baseView?: BaseView;

    public onAgeQueryChanged(ageQuery: string): void {
        this.ageQuery = ageQuery
    }

    public onLoginQueryChanged(loginQuery: string): void {
        this.loginQuery = loginQuery
    }

    public onNameQueryChanged(nameQuery: string): void {
        this.nameQuery = nameQuery
    }

    public onEmailQueryChanged(emailQuery: string): void {
        this.emailQuery = emailQuery
    }

    public onPasswordConfirmQueryChanged(passwordQuery: string): void {

    }

    public onPasswordQueryChanged(passwordQuery: string): void {
        this.passwordQuery = passwordQuery
    }


    constructor(loginUseCase: LoginUseCase) {
        this.ageQuery = '';
        this.authStatus = '';
        this.emailQuery = '';
        this.nameQuery = '';
        this.passwordQuery = '';
        this.loginQuery = '';
        this.loginUseCase = loginUseCase
    }

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    };

    public detachView = (): void => {
        this.baseView = undefined;
    };

    public onClickSubmit = async (): Promise<void> => {
        try {
            await this.loginUseCase.registerUser(this.emailQuery, this.passwordQuery, this.nameQuery, Number(this.ageQuery), this.loginQuery);
        } catch (e) {
            console.log(e);
        }

        this.notifyViewAboutChanges();
    };

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}