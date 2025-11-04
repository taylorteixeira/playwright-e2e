import { Page } from '@playwright/test';
import { RocketseatCadastroElements } from '../elements/RocketseatCadastroElements';

export class RocketseatCadastroPage {
    private page: Page;
    private elements: RocketseatCadastroElements;

    constructor(page: Page) {
        this.page = page;
        this.elements = new RocketseatCadastroElements(page);
    }

    async navigateToSignup() {
        await this.page.goto('https://app.rocketseat.com.br/signup?to=%2F');
    }

    async fillName(name: string) {
        await this.elements.nameInput().fill(name);
    }

    async fillEmail(email: string) {
        await this.elements.emailInput().fill(email);
    }

    async fillPassword(password: string) {
        await this.elements.passwordInput().fill(password);
    }

    async fillConfirmPassword(confirmPassword: string) {
        await this.elements.confirmPasswordInput().fill(confirmPassword);
    }

    async clickRegisterButton(options?: { force?: boolean }) {
        await this.elements.registerButton().click(options);
    }

    async register(name: string, email: string, password: string, confirmPassword: string) {
        await this.fillName(name);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(confirmPassword);
        await this.clickRegisterButton();
    }

    async getErrorMessageFor(field: 'name' | 'email' | 'password' | 'confirmPassword') {

        switch (field) {
            case 'name':
            case 'email':
                return this.page.locator('text="Campo obrigatório"');
            case 'password':
            case 'confirmPassword':
                return this.page.locator('text="Deve ter no mínimo 7 caracteres"');
            default:
                return this.page.locator('text="Erro de validação"');
        }
    }
}
