import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../enums/text-mask/text-mask.enum';
import { TextInputModel } from './text-input.model';

describe('TextInputModel', () => {
    it('should create a text input with default type and format', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            placeholder: 'Digite algo',
            format: TextFormat.email,
        });

        expect(input).toBeDefined();
        expect(input.type).toBe(FormElementType.text);
        expect(input.placeholder).toBe('Digite algo');
        expect(input.format).toBe(TextFormat.email);
    });

    it('should set correct mask for CPF', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.cpf,
        });

        expect(input.mask).toBe(TextMask.cpf);
        expect(input.format).toBe(TextFormat.cpf);
        expect(input.type).toBe(FormElementType.text);
    });

    it('should set correct mask for CNPJ', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.cnpj,
        });

        expect(input.mask).toBe(TextMask.cnpj);
    });

    it('should set correct mask for Date', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.date,
        });

        expect(input.mask).toBe(TextMask.date);
    });

    it('should set correct mask for Email', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.email,
        });

        expect(input.mask).toBe(TextMask.email);
    });

    it('should set correct mask for Phone', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.phone,
        });

        expect(input.mask).toBe(TextMask.phone);
    });

    it('should set correct mask for Time', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.time,
        });

        expect(input.mask).toBe(TextMask.time);
    });

    it('should set correct mask for ZipCode', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.zipCode,
        });

        expect(input.mask).toBe(TextMask.zipCode);
    });

    it('should correctly handle numeric format: integer', () => {
        const input = new TextInputModel({
            format: TextFormat.number,
            control: new FormControl(),
            allowNegativeNumbers: false,
            min: 0,
            max: 100,
        });

        expect(input.mask).toBeUndefined();
        expect(input.allowNegativeNumbers).toBe(false);
    });

    it('should correctly handle numeric format: float with decimal places', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.number,
            decimalPlaces: 2,
            allowNegativeNumbers: true,
            min: 0,
            max: 100,
        });

        expect(input.mask).toBeUndefined();
        expect(input.allowNegativeNumbers).toBe(true);
    });

    it('should use empty string for missing prefix/suffix', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.number,
        });

        expect(input.prefix).toBe('');
        expect(input.suffix).toBe('');
    });

    it('should use provided prefix and suffix', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.number,
            prefix: 'R$',
            suffix: '%',
        });

        expect(input.prefix).toBe('R$');
        expect(input.suffix).toBe('%');
    });

    it('should handle invalid decimalPlaces gracefully', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.number,
            decimalPlaces: -5,
            min: 0,
            max: 100,
        });

        expect(input.mask).toBeUndefined();
    });

    it('should default to null mask and format if none provided', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: undefined,
            mask: undefined,
        });

        expect(input.mask).toBeUndefined();
        expect(input.format).toBeUndefined();
    });

    it('should handle password format correctly', () => {
        const input = new TextInputModel({
            control: new FormControl(),
            format: TextFormat.password,
        });

        expect(input.mask).toBeUndefined();
        expect(input.format).toBe(TextFormat.password);
    });

    // TODO: complete testes
});
