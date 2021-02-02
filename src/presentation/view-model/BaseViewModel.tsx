import BaseView from "../view/baseView";

export default interface BaseViewModel {
    attachView(baseView: BaseView): void;

    detachView(): void;
}