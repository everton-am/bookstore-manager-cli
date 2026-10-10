import { LivroRepository } from '../repositories/LivroRepository.js';
import { AutorRepository } from '../repositories/AutorRepository.js';
import { Livro } from '../models/Livro.js';

export class LivroService {
  private livroRepository = new LivroRepository();
  private autorRepository = new AutorRepository();

  async criar(titulo: string, idAutor: number, quantidadeTotal: number): Promise<Livro> {
    if (!titulo || quantidadeTotal <= 0) {
      throw new Error('Título é obrigatório e quantidade deve ser maior do que zero.');
    }

    const autor = await this.autorRepository.buscarPorId(idAutor);
    if (!autor) {
      throw new Error(`Autor com ID ${idAutor} não existe.`);
    }

    return await this.livroRepository.criar({
      titulo,
      id_autor: idAutor,
      quantidade_total: quantidadeTotal,
      quantidade_disponivel: quantidadeTotal,
    });
  }

  async listar(): Promise<Livro[]> {
    return await this.livroRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new Error(`Livro com ID ${id} não foi encontrado.`);
    }
    return livro;
  }
}