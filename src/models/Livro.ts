export interface Livro {
  id?: number;
  titulo: string;
  id_autor: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  autor_nome?: string;
}