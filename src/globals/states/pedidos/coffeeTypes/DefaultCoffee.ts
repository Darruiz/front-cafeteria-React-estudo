// globals/states/pedidos/coffeeTypes/DefaultCoffee.ts
import { Pedido } from '../pedidos';

export class DefaultCoffee extends Pedido {
    tipoCafe: string;
    tamanho: string;
    adicionais: string[];

    constructor(
        id: string,
        cliente: string,
        itens: string[],
        quantidade: number,
        tipoCafe: string,
        tamanho: string,
        adicionais: string[]
    ) {
        super(id, cliente, itens, quantidade);
        this.tipoCafe = tipoCafe;
        this.tamanho = tamanho;
        this.adicionais = adicionais;
    }

    calcularValorTotal(): number {
        let precoBase = 5;
        if (this.tamanho === 'Médio') precoBase += 2;
        if (this.tamanho === 'Grande') precoBase += 4;

        const custoAdicionais = this.adicionais.length * 1.5;
        return this.quantidade * (precoBase + custoAdicionais);
    }

    exibirDetalhes(): void {
        super.exibirDetalhes();
        console.log(`Tipo de Café: ${this.tipoCafe}`);
        console.log(`Tamanho: ${this.tamanho}`);
        console.log(`Adicionais: ${this.adicionais.join(', ')}`);
    }
}