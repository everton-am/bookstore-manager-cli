import { pool } from '../database/connection.js';
import { Emprestimo } from '../models/Emprestimo.js';

export class EmprestimoRepository {
  async criar(idLivro: number, idCliente: number): Promise<Emprestimo> {
    const query = `
      INSERT INTO emprestimos (id_livro, id_cliente, status) 
      VALUES ($1, $2, 'ATIVO') RETURNING *
    `;
    const result = await pool.query(query, [idLivro, idCliente]);
    return result.rows[0];
  }

  async registrarDevolucao(idEmprestimo: number): Promise<Emprestimo | null> {
    const query = `
      UPDATE emprestimos 
      SET status = 'DEVOLVIDO', data_devolucao = CURRENT_TIMESTAMP 
      WHERE id = $1 AND status = 'ATIVO' 
      RETURNING *
    `;
    const result = await pool.query(query, [idEmprestimo]);
    return result.rows[0] || null;
  }

  async listarTodos(): Promise<Emprestimo[]> {
    const query = `
      SELECT e.*, l.titulo as livro_titulo, c.nome as cliente_nome 
      FROM emprestimos e
      INNER JOIN livros l ON e.id_livro = l.id
      INNER JOIN clientes c ON e.id_cliente = c.id
      ORDER BY e.id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    const result = await pool.query('SELECT * FROM emprestimos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}