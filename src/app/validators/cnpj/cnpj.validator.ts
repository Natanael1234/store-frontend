import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function allDigitsAreEqual(str: string): boolean {
    return new Set(str).size === 1;
}

// TODO: cnpj vai mudar a partir de 2026
function isValidCNPJ(cnpj: string) {
    // Valida DVs
    let tamanho: number = cnpj.length - 2;
    let numeros: string = cnpj.substring(0, tamanho);
    let digitos: string = cnpj.substring(tamanho);
    let soma: number = 0;
    let pos: number = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado: number = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != +digitos.charAt(0)) {
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += +numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != +digitos.charAt(1)) {
        return false;
    }

    return true;
}

export function cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;
        if (!value) {
            return null; // vazio é considerado válido
        }

        // Remove tudo que não é número
        const cnpj = value.replace(/\D/g, '');

        if (cnpj.length !== 14) {
            return { cnpj: { message: 'CNPJ inválido.' } };
        }

        // Verifica se todos os dígitos são iguais
        if (allDigitsAreEqual(cnpj)) {
            return { cnpj: { message: 'CNPJ inválido.' } };
        }

        if (!isValidCNPJ(cnpj)) {
            return { cnpj: { message: 'CNPJ inválido.' } };
        }

        return null;
    };
}
