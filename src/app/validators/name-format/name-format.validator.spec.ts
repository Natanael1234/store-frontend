import { FormControl } from '@angular/forms';
import { nameFormatValidator } from '@validators/name-format/name-format.validator';

describe('nameFormatValidator', () => {
    const validator = nameFormatValidator();

    it('deve aceitar nomes simples válidos', () => {
        expect(validator(new FormControl('João'))).toBeNull();
        expect(validator(new FormControl('Maria Silva'))).toBeNull();
    });

    it('deve aceitar nomes com pontuação válida', () => {
        expect(validator(new FormControl('Dr. Ana-Paula'))).toBeNull();
    });

    it('deve aceitar apenas espaços', () => {
        expect(validator(new FormControl('   '))).toEqual(null);
    });

    it('deve rejeitar símbolos inválidos', () => {
        expect(validator(new FormControl('@@@'))).toBeNull();
    });

    it('deve aceitar números e letras combinados', () => {
        expect(validator(new FormControl('Bloco 12A'))).toBeNull();
    });

    it('deve retornar null se o campo estiver vazio', () => {
        expect(validator(new FormControl(''))).toBeNull();
    });
});
