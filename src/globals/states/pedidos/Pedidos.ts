// globals/states/pedidos/Pedidos.ts
export abstract class Pedido {
    id: string;
    cliente: string;
    itens: string[];
    quantidade: number;

    constructor(id: string, cliente: string, itens: string[], quantidade: number) {
        this.id = id;
        this.cliente = cliente;
        this.itens = itens;
        this.quantidade = quantidade;
    }

    abstract calcularValorTotal(): number;

    exibirDetalhes(): void {
        console.log(`Pedido #${this.id}`);
        console.log(`Cliente: ${this.cliente}`);
        console.log(`Itens: ${this.itens.join(', ')}`);
        console.log(`Quantidade: ${this.quantidade}`);
    }
}