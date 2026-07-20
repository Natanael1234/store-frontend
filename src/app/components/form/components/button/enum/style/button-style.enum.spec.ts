import { ButtonStyle } from './button-style.enum';

describe('ButtonStyle enum.', () => {
    it('should be defined.', () => {
        expect(ButtonStyle).toBeDefined();
    });

    it('should have valid keys and values.', () => {
        const options = { ...ButtonStyle } as any;
        expect(options).toEqual({
            text: 'text',
            elevated: 'elevated',
            outlined: 'outlined',
            filled: 'filled',
            tonal: 'tonal',
        });
    });
});
