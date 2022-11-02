import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AnyNsRecord } from 'dns';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
  private jogadores: IJogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `jogador com e-mail ${email} já cadastrado`,
      );
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`jogador com id ${_id} não foi encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async consultarTodosJogadores(): Promise<IJogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<IJogador> {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
