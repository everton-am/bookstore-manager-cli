import readline from 'readline-sync';
import { ClienteService } from '../services/ClienteService.js';

export class ClienteController {
  private clienteService = new ClienteService();

  async cadastrar(): Promise<void> {
    console.log('\n--- Cadastrar Cliente ---');
    const nome = readline.question('Nome do Cliente: ');
    const email = readline.question('E-mail: ');
    const telefone = readline.question('Telefone: ');

    try {
      const cliente = await this.clienteService.criar(nome, email, telefone);
      console.log(` Cliente "${cliente.nome}" cadastrado com sucesso! ID: ${cliente.id}`);
    } catch (error: any) {
      console.error(` Erro ao cadastrar cliente: ${error.message}`);
    }
  }

  async listar(): Promise<void> {
    console.log('\n--- Lista de Clientes ---');
    try {
      const clientes = await this.clienteService.listar();
      if (clientes.length === 0) {
        console.log('Nenhum cliente cadastrado.');
        return;
      }
      console.table(clientes);
    } catch (error: any) {
      console.error(` Erro ao listar clientes: ${error.message}`);
    }
  }
}
