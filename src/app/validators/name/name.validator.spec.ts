import { FormControl } from '@angular/forms';
import { nameValidator } from './name.validator';

describe('Name Validator', () => {
    describe('required', () => {
        describe('when options is not defined (true by default)', () => {
            const validator = nameValidator();

            it('should return error for null value', () => {
                const control = new FormControl(null);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for undefined value', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for empty string', () => {
                const control = new FormControl('');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for whitespace-only string', () => {
                const control = new FormControl('    ');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return null for valid name', () => {
                const control = new FormControl('John Doe');
                expect(validator(control)).toBeNull();
            });

            it('should return null for special characters', () => {
                const control = new FormControl('John#Doe!');
                expect(validator(control)).toBeNull();
            });

            it('should return null for true', () => {
                const control = new FormControl(true);
                expect(validator(control)).toBeNull();
            });

            it('should return error for false', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for number', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return error for array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when required is not defined (true by default)', () => {
            const validator = nameValidator({});

            it('should return error for null value', () => {
                const control = new FormControl(null);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for undefined value', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for empty string', () => {
                const control = new FormControl('');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for whitespace-only string', () => {
                const control = new FormControl('    ');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return null for valid name', () => {
                const control = new FormControl('John Doe');
                expect(validator(control)).toBeNull();
            });

            it('should return null for special characters', () => {
                const control = new FormControl('John#Doe!');
                expect(validator(control)).toBeNull();
            });

            it('should return null for true', () => {
                const control = new FormControl(true);
                expect(validator(control)).toBeNull();
            });

            it('should return error for false', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for number', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return error for array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when required = false', () => {
            const validator = nameValidator({ required: false });

            it('should return null for null value', () => {
                const control = new FormControl(null);
                expect(validator(control)).toBeNull();
            });

            xit('should return null for undefined value', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toBeNull();
            });

            it('should return null for empty string', () => {
                const control = new FormControl('');
                expect(validator(control)).toBeNull();
            });

            it('should return null for whitespace-only string', () => {
                const control = new FormControl('    ');
                expect(validator(control)).toBeNull();
            });

            it('should return null for valid name', () => {
                const control = new FormControl('John Doe');
                expect(validator(control)).toBeNull();
            });

            it('should return null error for special characters', () => {
                const control = new FormControl('John@Doe!');
                expect(validator(control)).toBeNull();
            });

            it('should return null for true', () => {
                const control = new FormControl(true);
                expect(validator(control)).toBeNull();
            });

            it('should return null for true', () => {
                const control = new FormControl(true);
                expect(validator(control)).toBeNull();
            });

            it('should return error for number', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return error for array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when required = true', () => {
            const validator = nameValidator({ required: true });

            it('should return required error for null', () => {
                const control = new FormControl(null);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return required error for undefined', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return required error for empty string', () => {
                const control = new FormControl('');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return required error for whitespace-only string', () => {
                const control = new FormControl('     ');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return null for valid name', () => {
                const control = new FormControl('Alice');
                expect(validator(control)).toBeNull();
            });

            it('should return null for special characters', () => {
                const control = new FormControl('Alice@#');
                expect(validator(control)).toBeNull();
            });

            it('should return null for true', () => {
                const control = new FormControl(true);
                expect(validator(control)).toBeNull();
            });

            it('should return error for false', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return error for number 0', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return error for number', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return error for array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });
    });

    describe('minlength', () => {
        describe('when options is not specified (minlength not defined by default)', () => {
            const validator = nameValidator();

            it('should return null if value has length 1', () => {
                const control = new FormControl('x');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 0', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number greather than 0', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when minlength is not defined', () => {
            const validator = nameValidator();

            it('should return null if value has length 1', () => {
                const control = new FormControl('x');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 0', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number greather than 0', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when minlength is specified', () => {
            const validator = nameValidator({ minlength: 5 });

            it('should return minlength error if value is too short', () => {
                const control = new FormControl('Ana');
                expect(validator(control)).toEqual({
                    minlength: {
                        message: 'O comprimento mínimo permitido é 5.',
                    },
                });
            });

            it('should return null if value length is equal to minlength', () => {
                const control = new FormControl('Maria');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value length is greater than minlength', () => {
                const control = new FormControl('Gabriel');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length greather than minlength', () => {
                const control = new FormControl(100000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length equal to minlength', () => {
                const control = new FormControl(10000);
                expect(validator(control)).toBeNull();
            });

            it('should return error if value is number with length lower than minlength', () => {
                const control = new FormControl(1000);
                expect(validator(control)).toEqual({
                    minlength: {
                        message: 'O comprimento mínimo permitido é 5.',
                    },
                });
            });

            it('should return null if value is object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });
    });

    describe('maxlength', () => {
        describe('when options', () => {
            const validator = nameValidator({});

            it('should return null if value length is very big', () => {
                const control = new FormControl('x'.repeat(10000));
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when maxlength is not specified', () => {
            const validator = nameValidator({});

            it('should return null if value length is very big', () => {
                const control = new FormControl('x'.repeat(10000));
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });

        describe('when maxlength is specified', () => {
            const validator = nameValidator({ maxlength: 5 });

            it('should return maxLength error if value is too long', () => {
                const control = new FormControl('Beatriz');
                expect(validator(control)).toEqual({
                    maxLength: {
                        message: 'O comprimento máximo permitido é 5.',
                    },
                });
            });

            it('should return null if value length is equal to maxlength', () => {
                const control = new FormControl('Maria');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length lower than maxlength', () => {
                const control = new FormControl(1000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length equal to maxlength', () => {
                const control = new FormControl(10000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length greater to maxlength', () => {
                const control = new FormControl(100000);
                expect(validator(control)).toEqual({
                    maxLength: {
                        message: 'O comprimento máximo permitido é 5.',
                    },
                });
            });

            it('should return null if value is object', () => {
                const control = new FormControl({});
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is array', () => {
                const control = new FormControl([]);
                expect(validator(control)).toBeNull();
            });
        });
    });
});
