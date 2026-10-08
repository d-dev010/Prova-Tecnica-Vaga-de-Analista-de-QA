const { expect } = require('@playwright/test');

class ProvaCarPage {
    constructor(page) {
        this.page = page;
        this.btnComecar = page.locator('text=Começar');
        this.btnNovoModelo = page.locator('#botaoNovoVeiculo');
        this.modalNovoModelo = page.locator('.modal-content');
        
        this.selectFabricante = page.locator('#novoFabricante');
        this.selectFamilia = page.locator('#novaFamilia');
        
        this.inputMolicar = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Molicar")) input');
        this.inputModelo = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Modelo")) input');
        this.selectCombustivel = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Combustível")) select');
        this.inputPortas = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Portas")) input');
        this.inputAnoInicio = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Ano início")) input');
        this.inputAnoFim = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Ano fim")) input');
        this.inputCilindradas = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Cilindradas")) input');
        this.inputCavalos = this.modalNovoModelo.locator('div.form-group:has(label:has-text("Cavalos")) input');
        
        this.btnSalvar = this.modalNovoModelo.locator('button:has-text("Salvar")');
        this.btnVoltar = this.modalNovoModelo.locator('button:has-text("Voltar")');
        this.toastMessage = page.locator('.toast-message');

        this.tableRows = page.locator('#tableModelos tbody tr');
    }

    async acessarSistema() {
        await this.page.goto('https://provaqa.fandi.com.br/');
        await this.btnComecar.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { ProvaCarPage };
