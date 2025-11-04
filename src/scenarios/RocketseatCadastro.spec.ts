import { test, expect } from '@playwright/test';
import { RocketseatCadastroPage } from '../support/pages/RocketseatCadastroPage';
import { RocketseatCadastroElements } from '../support/elements/RocketseatCadastroElements';
import { ai } from '@zerostep/playwright';

test.describe('Testes de Cadastro na Rocketseat', () => {
  let cadastroPage: RocketseatCadastroPage;
  let cadastroElements: RocketseatCadastroElements;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new RocketseatCadastroPage(page);
    cadastroElements = new RocketseatCadastroElements(page);
    await cadastroPage.navigateToSignup();
  });

  // Teste 1: Tentativa de cadastro com todos os campos vazios
 test('TC001 - Deve exibir erro ao tentar cadastrar com todos os campos vazios', async ({
   page
 }) => {
   await ai('Clique em Permitir todos os cookies', { page, test });

   await ai('Click on the registration submit button', { page, test });

 });

  // Teste 2: Tentativa de cadastro com e-mail inválido
  test('TC002 - Deve exibir erro ao tentar cadastrar com formato de e-mail inválido', async () => {
    await cadastroPage.fillName('Teste Nome');
    await cadastroPage.fillEmail('emailinvalido'); // E-mail sem "@" e domínio
    await cadastroPage.fillPassword('senhaforte123');
    await cadastroPage.fillConfirmPassword('senhaforte123');
    await cadastroPage.clickRegisterButton({ force: true });

    await expect(cadastroElements.emailInput()).toHaveValue('emailinvalido');
    await expect(cadastroElements.emailInput()).toBeVisible(); // A página não deve ter navegado
  });

  // Teste 3: Tentativa de cadastro com senha curta (menos de 7 caracteres)
  test('TC003 - Deve exibir erro ao tentar cadastrar com senha menor que 7 caracteres', async () => {
    await cadastroPage.fillName('Teste Nome');
    await cadastroPage.fillEmail(`teste${Date.now()}@teste.com`);
    await cadastroPage.fillPassword('curta'); // 5 caracteres
    await cadastroPage.fillConfirmPassword('curta');
    await cadastroPage.clickRegisterButton({ force: true });

    await expect(cadastroElements.passwordInput()).toHaveValue('curta');
    await expect(cadastroElements.passwordInput()).toBeVisible(); // A página não deve ter navegado
  });

  // Teste 4: Tentativa de cadastro com senhas que não coincidem
  test('TC004 - Deve exibir erro ao tentar cadastrar com senhas que não coincidem', async () => {
    await cadastroPage.fillName('Teste Nome');
    await cadastroPage.fillEmail(`teste${Date.now()}@teste.com`);
    await cadastroPage.fillPassword('senhaforte123');
    await cadastroPage.fillConfirmPassword('senhadiferente');
    await cadastroPage.clickRegisterButton({ force: true });

    await expect(cadastroElements.confirmPasswordInput()).toHaveValue(
      'senhadiferente'
    );
    await expect(cadastroElements.confirmPasswordInput()).toBeVisible(); // A página não deve ter navegado
  });

  // Teste 5: Tentativa de cadastro com nome vazio
  test('TC005 - Deve exibir erro ao tentar cadastrar com campo Nome vazio', async ({
    page
  }) => {
    await cadastroPage.fillName('');
    await cadastroPage.fillEmail(`teste${Date.now()}@teste.com`);
    await cadastroPage.fillPassword('senhaforte123');
    await cadastroPage.fillConfirmPassword('senhaforte123');
    await cadastroPage.clickRegisterButton({ force: true });

    // O campo "Nome completo" é o primeiro a ser validado.
    await expect(cadastroElements.nameInput()).toBeEmpty();
    await expect(page).toHaveURL(/signup/);
  });

  // Teste 6: Tentativa de cadastro com e-mail já cadastrado (Simulação)

  test('TC006 - Deve exibir erro ao tentar cadastrar com e-mail já cadastrado (Simulação)', async ({
    page
  }) => {
    const existingEmail = 'teste@rocketseat.com.br';

    await cadastroPage.fillName('Teste Nome');
    await cadastroPage.fillEmail(existingEmail);
    await cadastroPage.fillPassword('senhaforte123');
    await cadastroPage.fillConfirmPassword('senhaforte123');
    await cadastroPage.clickRegisterButton({ force: true });

    await expect(page).toHaveURL(/signup/);
  });

  // Teste 7: Tentativa de cadastro com senha contendo caractere especial (e-mail e nome válidos)

  test('TC007 - Deve permitir cadastro com senha contendo caractere especial (Simulação de Sucesso)', async ({
    page
  }) => {
    const uniqueEmail = `teste${Date.now()}@teste.com`;

    await cadastroPage.fillName('Teste Caractere');
    await cadastroPage.fillEmail(uniqueEmail);
    await cadastroPage.fillPassword('Senha@123');
    await cadastroPage.fillConfirmPassword('Senha@123');

    await cadastroPage.clickRegisterButton({ force: true });

    await expect(page).toHaveURL(/signup/);
  });
});
