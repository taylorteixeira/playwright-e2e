import { Page, Locator } from '@playwright/test';

export class RocketseatCadastroElements {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    nameInput(): Locator {
        return this.page.getByPlaceholder('Seu nome completo');
    }

    emailInput(): Locator {
        return this.page.getByPlaceholder('Seu e-mail');
    }

    passwordInput(): Locator {
        return this.page.locator('input[placeholder="Deve ter no mínimo 7 caracteres"]').first();
    }

    confirmPasswordInput(): Locator {
        // Usando o seletor de input com o placeholder e garantindo que é o segundo.
        return this.page.locator('input[placeholder="Deve ter no mínimo 7 caracteres"]').last();
    }

    registerButton(): Locator {
        return this.page.getByRole('button', { name: 'Cadastrar-se gratuitamente' });
    }

    // Locators para mensagens de erro (baseado na inspeção visual)
    errorMessage(text: string): Locator {
        return this.page.getByText(text);
    }
}
