class FormaDePagamento {
    constructor(nome, desconto, acrescimo) {
        this.nome = nome;
        this.desconto = desconto;
        this.acrescimo = acrescimo;
    }
}

const dinheiro = new FormaDePagamento('dinheiro', 0.05, 0);
const debito = new FormaDePagamento('debito', 0, 0);
const credito = new FormaDePagamento('credito', 0, 0.03);

module.exports = {
    dinheiro,
    debito,
    credito
};
