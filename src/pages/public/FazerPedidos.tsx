import React, { useState } from 'react';
import { Form } from '../../components/bases/inputs/Form';
import { DefaultCoffee } from '../../globals/states/pedidos/coffeeTypes/DefaultCoffee';

export function FazerPedidos() {
    const [pedidos, setPedidos] = useState<DefaultCoffee[]>([]);

    const fields = [
        {
            name: 'cliente',
            type: 'text' as const,
            label: 'Cliente',
            placeholder: 'Digite o nome do cliente',
            validation: (value: string) => (value.trim() ? null : 'Campo obrigatório'),
        },
        {
            name: 'tipoCafe',
            type: 'text' as const,
            label: 'Tipo de Café',
            placeholder: 'Espresso, Cappuccino...',
            validation: (value: string) => (value.trim() ? null : 'Campo obrigatório'),
        },
        {
            name: 'quantidade',
            type: 'number' as const,
            label: 'Quantidade',
            placeholder: '1',
            defaultValue: 1,
            validation: (value: number | string) =>
                Number(value) > 0 ? null : 'Deve ser maior que 0',
        },
        {
            name: 'tamanho',
            type: 'select' as const,
            label: 'Tamanho',
            options: [
                { label: 'Pequeno', value: 'Pequeno' },
                { label: 'Médio', value: 'Médio' },
                { label: 'Grande', value: 'Grande' },
            ],
            defaultValue: 'Médio',
            validation: (value: string) => (value ? null : 'Campo obrigatório'),
        },
        {
            name: 'adicionais',
            type: 'text' as const,
            label: 'Adicionais',
            placeholder: 'Leite, Chantilly...',
        },
    ];

    const handleSubmit = (data: Record<string, string | number | boolean>) => {
        const newPedido: DefaultCoffee = {
            cliente: data.cliente as string,
            tipoCafe: data.tipoCafe as string,
            quantidade: Number(data.quantidade),
            tamanho: data.tamanho as string,
            adicionais: (data.adicionais as string)?.split(',').map((item) => item.trim()) || [],
        };

        setPedidos((prevPedidos) => [...prevPedidos, newPedido]);
        alert('Pedido adicionado com sucesso!');
    };

    return (
        <div className="bg-gray-400 min-h-screen flex flex-col items-center py-10 px-4">
            <h1 className="text-gray-100 text-4xl font-bold mb-8">
                Fazer Pedidos
            </h1>
            <div className="w-full max-w-3xl bg-gray-700 rounded-lg shadow-lg p-6">
                <Form fields={fields} onSubmit={handleSubmit} submitLabel="Adicionar Pedido" />
            </div>
            {pedidos.length > 0 && (
                <div className="w-full max-w-3xl mt-10">
                    <h2 className="text-lg font-medium text-gray-200 mb-4">
                        Pedidos Recentes
                    </h2>
                    <ul className="bg-gray-500 rounded-lg shadow-md p-4 space-y-4">
                        {pedidos.map((pedido, index) => (
                            <li
                                key={index}
                                className="bg-gray-700 text-gray-100 py-4 px-6 rounded-lg flex flex-col space-y-2 shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <strong className="text-lg text-gray-200">{pedido.cliente}</strong>
                                    <span className="text-sm text-gray-300">
                                        {pedido.tamanho}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-200">Café:</span> {pedido.tipoCafe}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-200">Quantidade:</span>{' '}
                                    {pedido.quantidade} unidade(s)
                                </div>
                                {pedido.adicionais.length > 0 && (
                                    <div>
                                        <span className="font-semibold text-gray-200">Adicionais:</span>{' '}
                                        {pedido.adicionais.join(', ')}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}