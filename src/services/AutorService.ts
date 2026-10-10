import { AutorRepository } from '../repositories/AutorRepository.js';
import { Autor } from '../models/Autor.js';

export class AutorService {
  private autorRepository = new AutorRepository();

  async criar(nome: string, nacionalidade: string): Promise<Autor> {
    if (!nome || !nacionalidade) {
      throw new Error('Nome e nacionalidade são obrigatórios!!');
    }
    return await this.autorRepository.criar({ nome, nacionalidade });
  }

  async listar(): Promise<Autor[]> {
    return await this.autorRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);
    if (!autor) {
      throw new Error(`Autor com ID ${id} não foi encontrado.`);
    }
    return autor;
  }
}