import { ButtonAppearance } from './button-appearance.enum';

describe('ButtonAppearance enum.', () => {
    it('should be defined.', () => {
        expect(ButtonAppearance).toBeDefined();
    });

    it('should have valid keys and values.', () => {
        const options = { ...ButtonAppearance } as any;
        expect(options).toEqual({
            text: 'text',
            elevated: 'elevated',
            outlined: 'outlined',
            filled: 'filled',
            tonal: 'tonal',
        });
    });
});
