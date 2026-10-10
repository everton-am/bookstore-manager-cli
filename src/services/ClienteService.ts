import { ClienteRepository } from '../repositories/ClienteRepository.js';
import { Cliente } from '../models/Cliente.js';

export class ClienteService {
  private clienteRepository = new ClienteRepository();

  async criar(nome: string, email: string, telefone: string): Promise<Cliente> {
    if (!nome || !email || !telefone) {
      throw new Error('Nome, e-mail e telefone são obrigatórios.');
    }
    return await this.clienteRepository.criar({ nome, email, telefone });
  }

  async listar(): Promise<Cliente[]> {
    return await this.clienteRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não foi encontrado.`);
    }
    return cliente;
  }
}