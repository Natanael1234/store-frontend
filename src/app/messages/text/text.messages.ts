export class TextMessage {
  NULL: string;
  REQUIRED: string;
  INVALID: string;
  MIN_LEN?: string;
  MAX_LEN?: string;

  constructor(options?: { minLength?: number; maxLength?: number }) {
    this.NULL = `Nulo.`;
    this.REQUIRED = `Obrigatório.`;
    this.INVALID = `Inválido.`;
    if (options?.minLength == undefined) {
      this.MIN_LEN = 'Muito curto.';
    } else if (options?.minLength < 2) {
      this.MIN_LEN = `Deve conter pelo menos ${options.minLength} caracter.`;
    } else {
      this.MIN_LEN = `Deve conter pelo menos ${options.minLength} caracteres.`;
    }

    if (options?.maxLength == undefined) {
      this.MAX_LEN = 'Muito longo.';
    } else if (options.maxLength < 2) {
      this.MAX_LEN = `Deve conter no máximo ${options.maxLength} caracter.`;
    } else {
      this.MAX_LEN = `Deve conter no máximo ${options.maxLength} caracteres.`;
    }
  }
}
