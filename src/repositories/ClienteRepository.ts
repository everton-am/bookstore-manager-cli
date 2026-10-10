import { pool } from '../database/connection.js';
import { Cliente } from '../models/Cliente.js';

export class ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const query = 'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [cliente.nome, cliente.email, cliente.telefone]);
    return result.rows[0];
  }

  async listarTodos(): Promise<Cliente[]> {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id ASC');
    return result.rows;
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async deletar(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}