import { FormControl } from '@angular/forms';
import { OptativeElementOptions } from './optative-element.model';

describe('OptativeElementOptions Type', () => {
    it('should create a valid instance with required options', () => {
        const options: OptativeElementOptions = {
            control: new FormControl(),
            options: [
                { value: '1', label: 'Opção 1' },
                { value: '2', label: 'Opção 2' },
            ],
        };

        expect(options.control).toBeDefined();
        expect(options.options.length).toBe(2);
        expect(options.options[0].value).toBe('1');
        expect(options.options[0].label).toBe('Opção 1');
    });

    it('should allow setting an initial value', () => {
        const options: OptativeElementOptions = {
            control: new FormControl(),
            value: '2',
            options: [
                { value: '1', label: 'Opção 1' },
                { value: '2', label: 'Opção 2' },
            ],
        };

        expect(options.value).toBe('2');
    });

    it('should allow updating the value', () => {
        const control = new FormControl();
        const options: OptativeElementOptions = {
            control,
            value: '1',
            options: [
                { value: '1', label: 'Opção 1' },
                { value: '2', label: 'Opção 2' },
            ],
        };

        expect(options.value).toBe('1');
        options.value = '2';
        expect(options.value).toBe('2');
    });

    it('should be compatible with inherited properties from AbstractFormControlOptions', () => {
        const options: OptativeElementOptions = {
            id: 'select-example',
            label: 'Selecione',
            control: new FormControl(),
            options: [
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
            ],
        };

        expect(options.id).toBe('select-example');
        expect(options.label).toBe('Selecione');
        expect(options.control).toBeDefined();
    });
});
