import { FormControl } from '@angular/forms';
import { numericValidator } from './numeric.validator';

describe('Numeric Validator.', () => {
    describe('args.required.', () => {
        describe('when args is not defined (false by default).', () => {
            const validator = numericValidator();

            it('should return null for null value.', () => {
                const control = new FormControl(null);
                expect(validator(control)).toBeNull();
            });

            it('should return null for undefined value.', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toBeNull();
            });

            it('should return null for empty string.', () => {
                const control = new FormControl('');
                expect(validator(control)).toBeNull();
            });

            it('should return null for whitespace-only string.', () => {
                const control = new FormControl('    ');
                expect(validator(control)).toBeNull();
            });

            it('should return null for valid number string.', () => {
                const control = new FormControl('12345');
                expect(validator(control)).toBeNull();
            });

            it('should return error for special characters.', () => {
                const control = new FormControl('John#Doe!');
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for true.', () => {
                const control = new FormControl(true);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for false.', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null for number.', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when required is not defined (false by default).', () => {
            const validator = numericValidator({});

            it('should return null for null value.', () => {
                const control = new FormControl(null);
                expect(validator(control)).toBeNull();
            });

            it('should return null for undefined value.', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toBeNull();
            });

            it('should return null for empty string.', () => {
                const control = new FormControl('');
                expect(validator(control)).toBeNull();
            });

            it('should return null for whitespace-only string.', () => {
                const control = new FormControl('    ');
                expect(validator(control)).toBeNull();
            });

            it('should return null for valid number string.', () => {
                const control = new FormControl('12345');
                expect(validator(control)).toBeNull();
            });

            it('should return error for special characters.', () => {
                const control = new FormControl('123#456');
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for true.', () => {
                const control = new FormControl(true);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for false.', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null for number.', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when required = false.', () => {
            const validator = numericValidator({ required: false });

            it('should return null for null value.', () => {
                const control = new FormControl(null);
                expect(validator(control)).toBeNull();
            });

            it('should return null for undefined value.', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toBeNull();
            });

            it('should return null for empty string.', () => {
                const control = new FormControl('');
                expect(validator(control)).toBeNull();
            });

            it('should return null for whitespace-only string.', () => {
                const control = new FormControl('    ');
                expect(validator(control)).toBeNull();
            });

            it('should return null for valid number string.', () => {
                const control = new FormControl('12345');
                expect(validator(control)).toBeNull();
            });

            it('should return error for special characters.', () => {
                const control = new FormControl('12345!');
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for true.', () => {
                const control = new FormControl(true);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for false.', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null for number.', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when required = true.', () => {
            const validator = numericValidator({ required: true });

            it('should return required error for null.', () => {
                const control = new FormControl(null);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return required error for undefined.', () => {
                const control = new FormControl(undefined);
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return required error for empty string.', () => {
                const control = new FormControl('');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return required error for whitespace-only string.', () => {
                const control = new FormControl('     ');
                expect(validator(control)).toEqual({
                    required: { message: 'O campo é obrigatório.' },
                });
            });

            it('should return null for valid number.', () => {
                const control = new FormControl('12345');
                expect(validator(control)).toBeNull();
            });

            it('should return error for special characters.', () => {
                const control = new FormControl('1234@#');
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for true.', () => {
                const control = new FormControl(true);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for false.', () => {
                const control = new FormControl(false);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null for number 0.', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null for number.', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error for object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error for array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });
    });

    describe('args.minlength.', () => {
        describe('when args is not specified (minlength not defined by default).', () => {
            const validator = numericValidator();

            it('should return null if value has length 1.', () => {
                const control = new FormControl('1');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 0.', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number greather than 0.', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return error if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.minlength is not defined.', () => {
            const validator = numericValidator();

            it('should return null if value has length 1.', () => {
                const control = new FormControl('1');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 0.', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number greather than 0.', () => {
                const control = new FormControl(100);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.minlength is specified.', () => {
            const validator = numericValidator({ minLength: 5 });

            it('should return minlength error if value is too short.', () => {
                const control = new FormControl('123');
                expect(validator(control)).toEqual({
                    minLength: {
                        message: 'O comprimento mínimo permitido é 5.',
                    },
                });
            });

            it('should return null if value length is equal to minlength.', () => {
                const control = new FormControl('12345');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value length is greater than minlength.', () => {
                const control = new FormControl('1234567');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length greather than minlength.', () => {
                const control = new FormControl(100000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length equal to minlength.', () => {
                const control = new FormControl(10000);
                expect(validator(control)).toBeNull();
            });

            it('should return error if value is number with length lower than minlength.', () => {
                const control = new FormControl(1000);
                expect(validator(control)).toEqual({
                    minLength: {
                        message: 'O comprimento mínimo permitido é 5.',
                    },
                });
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });
    });

    describe('args.maxlength.', () => {
        describe('when args.maxLength is not defined.', () => {
            const validator = numericValidator({});

            it('should return null if value length is very big.', () => {
                const control = new FormControl('1'.repeat(10000));
                expect(validator(control)).toBeNull();
            });

            it('should return error if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.maxlength is not specified.', () => {
            const validator = numericValidator({});

            it('should return null if value length is very big.', () => {
                const control = new FormControl('1'.repeat(10000));
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.maxlength is specified.', () => {
            const validator = numericValidator({ maxLength: 5 });

            it('should return maxLength error if value is too long.', () => {
                const control = new FormControl('123456');
                expect(validator(control)).toEqual({
                    maxLength: {
                        message: 'O comprimento máximo permitido é 5.',
                    },
                });
            });

            it('should return null if value length is equal to maxlength.', () => {
                const control = new FormControl('12345');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length lower than maxlength.', () => {
                const control = new FormControl(1000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length equal to maxlength.', () => {
                const control = new FormControl(10000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number with length greater to maxlength.', () => {
                const control = new FormControl(100000);
                expect(validator(control)).toEqual({
                    maxLength: {
                        message: 'O comprimento máximo permitido é 5.',
                    },
                });
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });
    });

    describe('args.min.', () => {
        describe('when args is not specified (min not defined by default).', () => {
            const validator = numericValidator();
            it('should return null if value is string number 1.', () => {
                const control = new FormControl('1');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 1.', () => {
                const control = new FormControl(1);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is string number 0.', () => {
                const control = new FormControl('0');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 0.', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is string number lower than 0.', () => {
                const control = new FormControl('-1');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number lower than 0.', () => {
                const control = new FormControl(-1);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a great number string.', () => {
                const control = new FormControl('10000000');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a great number.', () => {
                const control = new FormControl(10000000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.min is not defined.', () => {
            const validator = numericValidator({});

            it('should return null if value is string number 1.', () => {
                const control = new FormControl('1');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 1.', () => {
                const control = new FormControl(1);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is string number 0.', () => {
                const control = new FormControl('0');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number 0.', () => {
                const control = new FormControl(0);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is string number lower than 0.', () => {
                const control = new FormControl('-1');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number lower than 0.', () => {
                const control = new FormControl(-1);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a great number string.', () => {
                const control = new FormControl('10000000');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a great number.', () => {
                const control = new FormControl(10000000);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.min is specified.', () => {
            const validator = numericValidator({ min: 5 });

            it('should return min error if value is string number lower than allowed min.', () => {
                const control = new FormControl('4');
                expect(validator(control)).toEqual({
                    min: { message: 'O valor mínimo permitido é 5.' },
                });
            });

            it('should return null if value is string number equal to min.', () => {
                const control = new FormControl('5');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is string number greater than min.', () => {
                const control = new FormControl('6');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number greather than min.', () => {
                const control = new FormControl(6);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is number equal to min.', () => {
                const control = new FormControl(5);
                expect(validator(control)).toBeNull();
            });

            it('should return error if value is number lower than min.', () => {
                const control = new FormControl(4);
                expect(validator(control)).toEqual({
                    min: { message: 'O valor mínimo permitido é 5.' },
                });
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });
    });

    describe('args.max.', () => {
        describe('when args is not specified (max not defined by default).', () => {
            const validator = numericValidator();

            it('should return null if value is a very lower string number.', () => {
                const control = new FormControl('-19898098080');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very lower number.', () => {
                const control = new FormControl(-19898098080);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very high string number.', () => {
                const control = new FormControl('19898098080');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very high  number.', () => {
                const control = new FormControl(19898098080);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.max is not defined.', () => {
            const validator = numericValidator();

            it('should return null if value is a very lower string number.', () => {
                const control = new FormControl('-19898098080');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very lower number.', () => {
                const control = new FormControl(-19898098080);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very high string number.', () => {
                const control = new FormControl('19898098080');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very high  number.', () => {
                const control = new FormControl(19898098080);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return null if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });

        describe('when args.max is specified.', () => {
            const validator = numericValidator({ max: 5 });

            it('should return null if value is a very lower string number.', () => {
                const control = new FormControl('-19898098080');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very lower number.', () => {
                const control = new FormControl(-19898098080);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a very lower string number.', () => {
                const control = new FormControl('-19898098080');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a string number lower than than maximum allowed.', () => {
                const control = new FormControl('4');
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a number lower than than maximum allowed.', () => {
                const control = new FormControl(4);
                expect(validator(control)).toBeNull();
            });

            it('should return null if value is a string number equal to the maximum allowed.', () => {
                const control = new FormControl('5');
                expect(validator(control)).toBeNull();
            });

            it('should return error if value is a number greather than the maximum allowed.', () => {
                const control = new FormControl(6);
                expect(validator(control)).toEqual({
                    min: { message: 'O valor máximo permitido é 5.' },
                });
            });

            it('should return error if value is a string number greather than the maximum allowed.', () => {
                const control = new FormControl('6');
                expect(validator(control)).toEqual({
                    min: { message: 'O valor máximo permitido é 5.' },
                });
            });

            it('should return error if value is object.', () => {
                const control = new FormControl({});
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });

            it('should return error if value is array.', () => {
                const control = new FormControl([]);
                expect(validator(control)).toEqual({
                    numeric: { message: 'O campo deve ser numérico.' },
                });
            });
        });
    });
});
