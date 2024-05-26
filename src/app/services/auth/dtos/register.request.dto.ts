export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  acceptTerms: boolean;
}
