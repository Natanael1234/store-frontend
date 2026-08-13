import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { maxLengthValidator } from '@validators/max-length/max-length.validator';
import { maxValidator } from '@validators/max/max.validator';
import { minLengthValidator } from '@validators/min-length/min-length.validator';
import { minValidator } from '@validators/min/min.validator';
import { nameFormatValidator } from '@validators/name-format/name-format.validator';
import { requiredValidator } from '@validators/required/required.validator';

/**
 * Gera uma RegExp para validar números com as regras pedidas.
 *
 * @param precision - número máximo (ou exato, se exact=true) de casas decimais
 * @param exact - se true exige exatamente `precision` casas decimais; se false permite de 1 até `precision`
 * @returns RegExp para testar a string
 */
function makeFormatedNumberRegex(precision: number): RegExp {
    if (!Number.isInteger(precision) || precision < 1) {
        throw new Error('precision deve ser inteiro >= 1');
    }

    // parte decimal quando for exata: {N}, quando não-exata: {1,N}
    const decQuant = precision <= 0 ? `{${precision}}` : `{1,${precision}}`;

    // 1) formato com agrupamento de milhares por pontos (ex: 1.234.567)
    //    se houver decimal neste formato, usa vírgula: 1.234,56
    const grouped = `\\d{1,3}(?:\\.\\d{3})*(?:,\\d${decQuant})?`;

    // combinação: opcional sinal +/-, e um dos dois formatos
    const pattern = `^[+-]?${grouped}$`;

    return new RegExp(pattern);
}

/**
 * Gera uma RegExp para validar números com as regras pedidas.
 *
 * @param precision - número máximo (ou exato, se exact=true) de casas decimais
 * @param exact - se true exige exatamente `precision` casas decimais; se false permite de 1 até `precision`
 * @returns RegExp para testar a string
 */
function makeRawNumberRegex(precision: number): RegExp {
    if (!Number.isInteger(precision) || precision < 1) {
        throw new Error('precision deve ser inteiro >= 1');
    }

    // parte decimal quando for exata: {N}, quando não-exata: {1,N}
    const decQuant = precision <= 0 ? `{${precision}}` : `{1,${precision}}`;

    // 2) formato sem agrupamento de milhares (ex: 1234567)
    //    se houver decimal neste formato, usa ponto: 1234567.56
    const ungrouped = `\\d+(?:\\.\\d${decQuant})?`;

    // combinação: opcional sinal +/-, e um dos dois formatos
    const pattern = `^[+-]?${ungrouped}$`;

    return new RegExp(pattern);
}

const isNumber = (v: unknown): v is number =>
    typeof v === 'number' && !Number.isNaN(v);

const isStringLike = (v: unknown): v is string =>
    typeof v === 'string' || v instanceof String;

const toStringSafe = (v: unknown): string => String(v);

function basicNumericValidator(args?: {
    required?: boolean;
    allowFalse?: boolean;
}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let value: string;
        if (control.value == null) {
            if (args?.required) {
                // TODO: isolate messages
                return { required: { message: `O campo é obrigatório.` } };
            } else {
                return null;
            }
        } else if (isNumber(control.value)) {
            return null;
        } else if (isStringLike(control.value)) {
            value = toStringSafe(control.value?.toString()).trim();
            if (value == '') {
                if (args?.required) {
                    return { required: { message: `O campo é obrigatório.` } };
                } else {
                    return null;
                }
            }
            const isFormatedValue = makeFormatedNumberRegex(10).test(value);
            const isRawValue = makeRawNumberRegex(10).test(value);
            if (!isFormatedValue && !isRawValue) {
                return { numeric: { message: `O campo deve ser numérico.` } };
            }
            return null;
        } else {
            return { numeric: { message: `O campo deve ser numérico.` } };
        }
    };
}

export function numericValidator(args?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}): ValidatorFn {
    const required = !!(args?.required ?? false);
    const validators = [];
    if (required) {
        validators.push(
            requiredValidator({
                allowNull: required,
                allowEmptyString: required,
                allowSpaceFilledString: required,
                allowFalse: true, // false is validated by basicNumericValidator
            }),
        );
    }
    validators.push(nameFormatValidator());
    if (args?.minLength ?? false) {
        validators.push(minLengthValidator(args?.minLength!));
    }
    if (args?.maxLength ?? false) {
        validators.push(maxLengthValidator(args?.maxLength!));
    }
    if (args?.min ?? false) {
        validators.push(minValidator(args?.min!));
    }
    if (args?.max ?? false) {
        validators.push(maxValidator(args?.max!));
    }
    validators.push(basicNumericValidator({ required }));
    return Validators.compose(validators)!;
}
