const { test, expect } = require('@playwright/test');
const { ProvaCarPage } = require('../pages/ProvaCarPage');

test.describe('CRUD de Veículos', () => {
    let provaCarPage;

    test.beforeEach(async ({ page }) => {
        provaCarPage = new ProvaCarPage(page);
        await provaCarPage.acessarSistema();
    });

    test('Deve apresentar erro ao tentar salvar sem preencher campos obrigatorios', async () => {
        await provaCarPage.btnNovoModelo.click();
        await provaCarPage.btnSalvar.click();
        await expect(provaCarPage.toastMessage).toHaveText('Há campos obrigatórios não preenchidos');
    });

    test('Deve adicionar um novo veiculo com sucesso', async ({ page }) => {
        const dadosVeiculo = {
            fabricante: 'CHEVROLET',
            familia: 'ASTRA SEDAN',
            molicar: '010101-0',
            modelo: 'TESTE QA 1.0',
            combustivel: 'Gasolina',
            portas: '4',
            anoInicio: '2020',
            anoFim: '2022',
            cilindradas: '1000',
            cavalos: '80'
        };

        await provaCarPage.btnNovoModelo.click();
        await provaCarPage.selectFabricante.selectOption({ label: dadosVeiculo.fabricante });
        await page.waitForTimeout(1000);
        await provaCarPage.selectFamilia.selectOption({ label: dadosVeiculo.familia });
        await provaCarPage.inputMolicar.fill(dadosVeiculo.molicar);
        await provaCarPage.inputModelo.fill(dadosVeiculo.modelo);
        await provaCarPage.selectCombustivel.selectOption({ label: dadosVeiculo.combustivel });
        await provaCarPage.inputPortas.fill(dadosVeiculo.portas);
        await provaCarPage.inputAnoInicio.fill(dadosVeiculo.anoInicio);
        await provaCarPage.inputAnoFim.fill(dadosVeiculo.anoFim);
        await provaCarPage.inputCilindradas.fill(dadosVeiculo.cilindradas);
        await provaCarPage.inputCavalos.fill(dadosVeiculo.cavalos);
        await provaCarPage.btnSalvar.click();

        await expect(page.locator('.toast-success')).toBeVisible();
        await page.waitForTimeout(1000);
        await expect(provaCarPage.tableRows.filter({ hasText: 'TESTE QA 1.0' })).toBeVisible();
    });

    test('Deve editar um veiculo existente', async ({ page }) => {
        await provaCarPage.tableRows.first().locator('.botaoAcao.text-primary').click();
        await expect(provaCarPage.modalNovoModelo).toBeVisible();
        await provaCarPage.inputModelo.fill('MODELO EDITADO QA');
        await provaCarPage.btnSalvar.click();

        await expect(page.locator('.toast-success')).toBeVisible();
        await page.waitForTimeout(1000);
        await expect(provaCarPage.tableRows.first()).toContainText('MODELO EDITADO QA');
    });

    test('Deve excluir um veiculo existente', async ({ page }) => {
        const totalAntes = await provaCarPage.tableRows.count();
        await provaCarPage.tableRows.first().locator('.botaoAcao.text-danger').click();

        const swalConfirmBtn = page.locator('.swal2-confirm');
        await expect(swalConfirmBtn).toBeVisible();
        await swalConfirmBtn.click();

        await page.waitForTimeout(1000);
        await expect(provaCarPage.tableRows).toHaveCount(totalAntes - 1);
    });
});
