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
        // O Playwright pode ter dificuldade em distinguir entre os dois inputs com o mesmo placeholder.
        // Vamos usar o seletor de input com o placeholder e garantir que é o primeiro.
        // Alternativamente, podemos usar o seletor da label.
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
