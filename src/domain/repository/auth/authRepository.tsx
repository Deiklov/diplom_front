// @ts-ignore
import ValidationResult from "entity/auth/structures/ValidationResult";
// @ts-ignore
import AuthorizationResult from "entity/auth/structures/AuthorizationResult";

// Здесь мы объявляем интерфейс, который потом реализует класс для доступа к API
export default interface AuthRepository {
    /**
     * @throws {Error} if validation has not passed
     */
    validateCredentials(email: string, password: string): Promise<ValidationResult>;

    /**
     * @throws {Error} if credentials have not passed
     */
    login(email: string, password: string, validationKey: string): Promise<AuthorizationResult>;
}