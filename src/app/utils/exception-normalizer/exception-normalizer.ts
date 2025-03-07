import { HttpStatusCode } from '@angular/common/http';

export function normalizeException(error: any) {
  if (error.status == 0) {
    return 'Falha na requisição.'; // TODO: extrair texto
  } else if (error.error?.statusCode == HttpStatusCode.UnprocessableEntity) {
    return error;
  } else if (error.cause == HttpStatusCode.Unauthorized) {
    return error;
  } else if (error.error?.statusCode && error.error.message) {
    return error;
  } else if (error.status && typeof error.error == 'string') {
    return error;
  } else {
    return error.message;
  }
}
