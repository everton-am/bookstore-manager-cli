import { pool } from '../database/connection.js';
import { Livro } from '../models/Livro.js';

export class LivroRepository {
  async criar(livro: Livro): Promise<Livro> {
    const query = `
      INSERT INTO livros (titulo, id_autor, quantidade_total, quantidade_disponivel) 
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await pool.query(query, [
      livro.titulo,
      livro.id_autor,
      livro.quantidade_total,
      livro.quantidade_disponivel,
    ]);
    return result.rows[0];
  }

  async listarTodos(): Promise<Livro[]> {
    const query = `
      SELECT l.*, a.nome as autor_nome 
      FROM livros l 
      INNER JOIN autores a ON l.id_autor = a.id 
      ORDER BY l.id ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const query = `
      SELECT l.*, a.nome as autor_nome 
      FROM livros l 
      INNER JOIN autores a ON l.id_autor = a.id 
      WHERE l.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async atualizarEstoque(id: number, quantidadeDisponivel: number): Promise<void> {
    await pool.query('UPDATE livros SET quantidade_disponivel = $1 WHERE id = $2', [
      quantidadeDisponivel,
      id,
    ]);
  }

  async deletar(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async listarLivrosComAutores(): Promise<any[]> {
  const query = `
    SELECT l.id, l.titulo, l.ano_publicacao, a.nome as autor_name 
    FROM livros l
    JOIN autores a ON l.autor_id = a.id
  `;
  const result = await pool.query(query);
  return result.rows;
}
}

