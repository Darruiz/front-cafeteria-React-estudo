import { useState, useEffect } from 'react';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

let teste: string[] = [];

const listeners: Array<(newTeste: string[]) => void> = [];

export const addTeste = (item: string) => {
    teste = [...teste, item];
    listeners.forEach((callback) => callback(teste));
};

export const useTeste = () => {
    const [localTeste, setLocalTeste] = useState<string[]>(teste);

    useEffect(() => {
        const callback = (newTeste: string[]) => setLocalTeste(newTeste);
        listeners.push(callback);
        return () => {
            const index = listeners.indexOf(callback);
            if (index > -1) listeners.splice(index, 1);
        };
    }, []);

    return localTeste;
};

export const showTeste = () => { 
    console.log(teste);
}