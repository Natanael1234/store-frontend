import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../../../enums/input-mask-type/text-input-format.enum';
import { TextMask } from '../../../../enums/text-mask/text-mask.enum';
import { TextInput } from './text-input.model';

describe('TextInput', () => {
    it('should create a text input with default type and format', () => {
        const input = new TextInput({
            control: new FormControl(),
            placeholder: 'Digite algo',
            format: TextInputFormat.email,
        });

        expect(input).toBeDefined();
        expect(input.type).toBe(FormElementType.text);
        expect(input.placeholder).toBe('Digite algo');
        expect(input.format).toBe(TextInputFormat.email);
    });

    it('should set correct mask for CPF', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.cpf,
        });

        expect(input.mask).toBe(TextMask.cpf);
        expect(input.format).toBe(TextInputFormat.cpf);
        expect(input.type).toBe(FormElementType.text);
    });

    it('should set correct mask for CNPJ', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.cnpj,
        });

        expect(input.mask).toBe(TextMask.cnpj);
    });

    it('should set correct mask for Date', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.date,
        });

        expect(input.mask).toBe(TextMask.date);
    });

    it('should set correct mask for Email', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.email,
        });

        expect(input.mask).toBe(TextMask.email);
    });

    it('should set correct mask for Phone', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.phone,
        });

        expect(input.mask).toBe(TextMask.phone);
    });

    it('should set correct mask for Time', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.time,
        });

        expect(input.mask).toBe(TextMask.time);
    });

    it('should set correct mask for ZipCode', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.zipCode,
        });

        expect(input.mask).toBe(TextMask.zipCode);
    });

    it('should correctly handle numeric format: integer', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.integer,
            allowNegativeNumbers: false,
            min: 0,
            max: 100,
        });

        expect(input.mask).toContain(TextMask.currency);
        expect(input.allowNegativeNumbers).toBe(false);
    });

    it('should correctly handle numeric format: float with decimal places', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.float,
            decimalPlaces: 2,
            allowNegativeNumbers: true,
            min: 0,
            max: 100,
        });

        expect(input.mask).toContain(TextMask.currency);
        expect(input.allowNegativeNumbers).toBe(true);
    });

    it('should use empty string for missing prefix/suffix', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.float,
        });

        expect(input.prefix).toBe('');
        expect(input.suffix).toBe('');
    });

    it('should use provided prefix and suffix', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.float,
            prefix: 'R$',
            suffix: '%',
        });

        expect(input.prefix).toBe('R$');
        expect(input.suffix).toBe('%');
    });

    it('should handle invalid decimalPlaces gracefully', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.float,
            decimalPlaces: -5,
            min: 0,
            max: 100,
        });

        expect(input.mask).toContain(TextMask.currency);
    });

    it('should default to null mask and format if none provided', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: null,
            mask: null,
        });

        expect(input.mask).toBeNull();
        expect(input.format).toBeNull();
    });

    it('should handle password format correctly', () => {
        const input = new TextInput({
            control: new FormControl(),
            format: TextInputFormat.password,
        });

        expect(input.mask).toBeNull();
        expect(input.format).toBe(TextInputFormat.password);
    });
});
