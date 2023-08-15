import { Cardapio } from './cardapio.js';

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!['debito', 'credito', 'dinheiro'].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;

        const itensQuantidades = {};
        const itensExtras = [];
        const itensPrincipais = {};

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!Cardapio.itens[codigo]) {
                return "Item inválido!";
            }

            if (!itensQuantidades[codigo]) {
                itensQuantidades[codigo] = 0;
            }

            if (parseInt(quantidade) === 0) {
                return "Quantidade inválida!";
            }

            if (codigo.includes('extra')) {
                const codigoPrincipal = codigo.replace(' (extra do Café)', '').replace(' (extra do Sanduíche)', '');
                if (!itensQuantidades[codigoPrincipal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                itensExtras.push(codigo);
            } else {
                if (codigo === 'chantily' && !itensQuantidades['cafe']) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                if (codigo === 'queijo' && !itensQuantidades['sanduiche']) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                itensPrincipais[codigo] = true;
            }

            itensQuantidades[codigo] += parseInt(quantidade);
            valorTotal += Cardapio.itens[codigo].valor * parseInt(quantidade);
        }

        for (const codigoPrincipal of Object.keys(itensPrincipais)) {
            if (!itensQuantidades[codigoPrincipal]) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        valorTotal = Number(valorTotal.toFixed(2));
        
        const valorFormatado = valorTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        return valorFormatado;
    }
}

export {CaixaDaLanchonete};
