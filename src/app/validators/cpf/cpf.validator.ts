import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function allDigitsAreEqual(str: string): boolean {
    return new Set(str).size === 1;
}

function isValidCPF(cpf: string) {
    let soma = 0;
    let resto;
    if (cpf == '00000000000') {
        return false;
    }
    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) {
        resto = 0;
    }
    if (resto != parseInt(cpf.substring(9, 10))) {
        return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    }
    if (resto != parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}

export function cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;
        if (!value) {
            return null; // vazio é considerado válido
        }
        // Remove pontos e traço
        const cpf = value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            return { cpf: { message: 'CPF inválido.' } };
        }
        if (allDigitsAreEqual(cpf)) {
            return { cpf: { message: 'CPF inválido.' } };
        }
        if (!isValidCPF(cpf)) {
            return { cpf: { message: 'CPF inválido.' } };
        }
        return null;
    };
}
