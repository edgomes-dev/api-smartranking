import { Document } from 'mongoose';
import { IJogador } from 'src/jogadores/interfaces/jogador.interface';

import { IDesafioStatus } from './desafio-status.enum';

export interface IDesafio extends Document {
  dataHoraDesafio: Date;
  status: IDesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: IJogador;
  categoria: string;
  jogadores: Array<IJogador>;
  partida: IPartida;
}

export interface IPartida extends Document {
  categoria: string;
  jogadores: Array<IJogador>;
  def: IJogador;
  resultado: Array<IResultado>;
}

export interface IResultado {
  set: string;
}
