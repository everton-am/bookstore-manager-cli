import readline from 'readline-sync';
import { LivroService } from '../services/LivroService.js';

export class LivroController {
  private livroService = new LivroService();

  async cadastrar(): Promise<void> {
    console.log('\n--- Cadastrar Livro ---');
    const titulo = readline.question('Título do Livro: ');
    const idAutor = readline.questionInt('ID do Autor: ');
    const quantidade = readline.questionInt('Quantidade de Exemplares: ');

    try {
      const livro = await this.livroService.criar(titulo, idAutor, quantidade);
      console.log(` Livro "${livro.titulo}" cadastrado com sucesso! ID: ${livro.id}`);
    } catch (error: any) {
      console.error(` Erro ao cadastrar livro: ${error.message}`);
    }
  }

  async listar(): Promise<void> {
    console.log('\n--- Acervo de Livros ---');
    try {
      const livros = await this.livroService.listar();
      if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
        return;
      }
      console.table(livros);
    } catch (error: any) {
      console.error(` Erro ao listar livros: ${error.message}`);
    }
  }
}