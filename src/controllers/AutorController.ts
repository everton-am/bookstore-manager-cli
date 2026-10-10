import readline from 'readline-sync';
import { AutorService } from '../services/AutorService.js';

export class AutorController {
  private autorService = new AutorService();

  async cadastrar(): Promise<void> {
    console.log('\n--- Cadastrar Autor ---');
    const nome = readline.question('Nome do Autor: ');
    const nacionalidade = readline.question('Nacionalidade: ');

    try {
      const autor = await this.autorService.criar(nome, nacionalidade);
      console.log(` Autor "${autor.nome}" cadastrado com sucesso! ID: ${autor.id}`);
    } catch (error: any) {
      console.error(` Erro ao cadastrar autor: ${error.message}`);
    }
  }

  async listar(): Promise<void> {
    console.log('\n--- Lista de Autores ---');
    try {
      const autores = await this.autorService.listar();
      if (autores.length === 0) {
        console.log('Nenhum autor cadastrado.');
        return;
      }
      console.table(autores);
    } catch (error: any) {
      console.error(` Erro ao listar autores: ${error.message}`);
    }
  }
}