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
        // A lógica para obter a mensagem de erro pode ser complexa e depender de como a Rocketseat
        // exibe os erros. Para simplificar, vamos focar em verificar a visibilidade de um elemento
        // de erro genérico ou a ausência de navegação.
        // No entanto, para testes mais robustos, o ideal seria ter um seletor específico para a mensagem de erro.
        // Como não temos um seletor claro, vamos usar o seletor do input e verificar se ele tem um estado de erro.
        // Para este exercício, vamos retornar um texto de erro simulado ou um locator para verificação no teste.
        switch (field) {
            case 'name':
            case 'email':
                // O formulário da Rocketseat parece usar validação inline.
                // Vamos tentar localizar um elemento de erro próximo ao input.
                // Como não é visível no screenshot, vamos usar um seletor genérico para o teste.
                return this.page.locator('text="Campo obrigatório"');
            case 'password':
            case 'confirmPassword':
                return this.page.locator('text="Deve ter no mínimo 7 caracteres"');
            default:
                return this.page.locator('text="Erro de validação"');
        }
    }
}
