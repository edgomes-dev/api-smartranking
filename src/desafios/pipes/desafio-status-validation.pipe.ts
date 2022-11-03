import { PipeTransform, BadRequestException } from '@nestjs/common';
import { IDesafioStatus } from '../interfaces/desafio-status.enum';

export class DesafioStatusValidacaoPipe implements PipeTransform {
  readonly statusPermitidos = [
    IDesafioStatus.ACEITO,
    IDesafioStatus.NEGADO,
    IDesafioStatus.CANCELADO,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.ehStatusValido(status)) {
      throw new BadRequestException(`${status} é um status inválido`);
    }

    return value;
  }

  private ehStatusValido(status: any) {
    const idx = this.statusPermitidos.indexOf(status);
    return idx !== -1;
  }
}
