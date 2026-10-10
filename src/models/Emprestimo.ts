export interface Emprestimo {
  id?: number;
  id_livro: number;
  id_cliente: number;
  data_emprestimo?: Date;
  data_devolucao?: Date | null;
  status?: 'ATIVO' | 'DEVOLVIDO';
  livro_titulo?: string;
  cliente_nome?: string;
}