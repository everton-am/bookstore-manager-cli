import { EmprestimoRepository } from '../repositories/EmprestimoRepository.js';
import { LivroRepository } from '../repositories/LivroRepository.js';
import { ClienteRepository } from '../repositories/ClienteRepository.js';
import { Emprestimo } from '../models/Emprestimo.js';

export class EmprestimoService {
  private emprestimoRepository = new EmprestimoRepository();
  private livroRepository = new LivroRepository();
  private clienteRepository = new ClienteRepository();

  async realizarEmprestimo(idLivro: number, idCliente: number): Promise<Emprestimo> {
    const livro = await this.livroRepository.buscarPorId(idLivro);
    if (!livro) {
      throw new Error(`Livro com ID ${idLivro} não foi encontrado.`);
    }

    if (livro.quantidade_disponivel <= 0) {
      throw new Error(`O livro "${livro.titulo}" não tem exemplares disponíveis no momento.`);
    }

    const cliente = await this.clienteRepository.buscarPorId(idCliente);
    if (!cliente) {
      throw new Error(`Cliente com ID ${idCliente} não foi encontrado.`);
    }

    const novoEmprestimo = await this.emprestimoRepository.criar(idLivro, idCliente);
    await this.livroRepository.atualizarEstoque(idLivro, livro.quantidade_disponivel - 1);

    return novoEmprestimo;
  }

  async realizarDevolucao(idEmprestimo: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.buscarPorId(idEmprestimo);
    if (!emprestimo) {
      throw new Error(`Empréstimo com ID ${idEmprestimo} não foi encontrado.`);
    }

    if (emprestimo.status === 'DEVOLVIDO') {
      throw new Error('Este empréstimo já foi devolvido anteriormente.');
    }

    const devolucao = await this.emprestimoRepository.registrarDevolucao(idEmprestimo);
    const livro = await this.livroRepository.buscarPorId(emprestimo.id_livro);

    if (livro) {
      await this.livroRepository.atualizarEstoque(livro.id!, livro.quantidade_disponivel + 1);
    }

    return devolucao!;
  }

  async listar(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.listarTodos();
  }
}