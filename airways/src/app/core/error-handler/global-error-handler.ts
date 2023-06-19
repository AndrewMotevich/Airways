/* eslint-disable class-methods-use-this */
import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Обработка ошибки:
    // console.error('Ooops! =(:', error);
  }
}
