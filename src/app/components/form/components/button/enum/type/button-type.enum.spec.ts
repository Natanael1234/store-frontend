import { ButtonType } from './button-type.enum';

describe('ButtonType enum.', () => {
    it('should be defined.', () => {
        expect(ButtonType).toBeDefined();
    });

    it('should have valid keys and values.', () => {
        const options = { ...ButtonType } as any;
        expect(options).toEqual({
            button: 'button',
            submit: 'submit',
            reset: 'reset',
        });
    });
});
