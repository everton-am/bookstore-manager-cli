import readline from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService.js';

export class EmprestimoController {
  private emprestimoService = new EmprestimoService();

  async realizarEmprestimo(): Promise<void> {
    console.log(' \n--- Realizar Empréstimo ---');
    const idLivro = readline.questionInt('ID do Livro: ');
    const idCliente = readline.questionInt('ID do Cliente: ');

    try {
      const emprestimo = await this.emprestimoService.realizarEmprestimo(idLivro, idCliente);
      console.log(` Empréstimo realizado com sucesso! ID do Empréstimo: ${emprestimo.id}`);
    } catch (error: any) {
      console.error(` Erro ao realizar empréstimo: ${error.message}`);
    }
  }

  async realizarDevolucao(): Promise<void> {
    console.log('\n--- Registrar Devolução ---');
    const idEmprestimo = readline.questionInt('ID do Empréstimo: ');

    try {
      await this.emprestimoService.realizarDevolucao(idEmprestimo);
      console.log(` Devolução do empréstimo ID ${idEmprestimo} realizada com sucesso!`);
    } catch (error: any) {
      console.error(` Erro ao registrar devolução: ${error.message}`);
    }
  }

  async listar(): Promise<void> {
    console.log('\n--- Histórico de Empréstimos ---');
    try {
      const emprestimos = await this.emprestimoService.listar();
      if (emprestimos.length === 0) {
        console.log('Nenhum empréstimo registrado.');
        return;
      }
      console.table(emprestimos);
    } catch (error: any) {
      console.error(` Erro ao listar empréstimos: ${error.message}`);
    }
  }
}

