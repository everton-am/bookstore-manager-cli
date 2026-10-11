import { InputUtils } from '../utils/input.js';
import { AutorController } from '../controllers/AutorController.js';
import { LivroController } from '../controllers/LivroController.js';
import { ClienteController } from '../controllers/ClienteController.js';
import { EmprestimoController } from '../controllers/EmprestimoController.js';
import { LivroRepository } from '../repositories/LivroRepository.js';
import { ClienteRepository } from '../repositories/ClienteRepository.js';
import { AutorRepository } from '../repositories/AutorRepository.js';

export async function exibirMenuPrincipal() {
  const autorCtrl = new AutorController();
  const livroCtrl = new LivroController();
  const clienteCtrl = new ClienteController();
  const emprestimoCtrl = new EmprestimoController();

  let opcao = -1;

  while (opcao !== 0) {
    console.log(`
=========================================
        BOOKSTORE MANAGER CLI
=========================================
1. Cadastrar Autor
2. Listar Autores
-----------------------------------------
3. Cadastrar Livro
4. Listar Livros
-----------------------------------------
5. Cadastrar Cliente
6. Listar Clientes
-----------------------------------------
7. Realizar Empréstimo
8. Registrar Devolução
9. Listar Empréstimos
-----------------------------------------
10. Relatórios Gerenciais
11. Deletar Livro por ID
12. Deletar Cliente por ID
13. Deletar Autor por ID
0.  Sair
=========================================`);

    opcao = InputUtils.lerNumero('Escolha uma opção: ');

    switch (opcao) {
      case 1: 
        await autorCtrl.cadastrar(); 
        break;
      case 2: 
        await autorCtrl.listar(); 
        break;
      case 3: 
        await livroCtrl.cadastrar(); 
        break;
      case 4: 
        await livroCtrl.listar(); 
        break;
      case 5: 
        await clienteCtrl.cadastrar(); 
        break;
      case 6: 
        await clienteCtrl.listar(); 
        break;
      case 7: 
        await emprestimoCtrl.realizarEmprestimo(); 
        break;
      case 8: 
        await emprestimoCtrl.realizarDevolucao(); 
        break;
      case 9: 
        await emprestimoCtrl.listar(); 
        break;
      case 10: {
        const livroRepo = new LivroRepository();
        const relatorio = await livroRepo.listarLivrosComAutores();
        console.log('\n--- RELATÓRIO: LIVROS E AUTORES ---');
        console.table(relatorio);
        break;
      }
      case 11: {
        console.log('\n--- DELETAR LIVRO ---');
        const idLivro = InputUtils.lerNumero('Digite o ID do livro que deseja deletar: ');
        
        try {
          const livroRepo = new LivroRepository();
          const deletado = await livroRepo.deletar(idLivro);
          
          if (deletado) {
            console.log('Sucesso: Livro deletado com sucesso!');
          } else {
            console.log('Aviso: Nenhum livro encontrado com o ID informado.');
          }
        } catch (error: any) {
          console.error('Erro ao deletar livro:', error.message);
        }
        break;
      }
      case 12: {
        console.log('\n--- DELETAR CLIENTE ---');
        const idCliente = InputUtils.lerNumero('Digite o ID do cliente que deseja deletar: ');
        
        try {
          const clienteRepo = new ClienteRepository();
          const deletado = await clienteRepo.deletar(idCliente);
          
          if (deletado) {
            console.log('Sucesso: Cliente deletado com sucesso!');
          } else {
            console.log('Aviso: Nenhum cliente encontrado com o ID informado.');
          }
        } catch (error: any) {
          console.error('Erro ao deletar cliente:', error.message);
        }
        break;
      }
      case 13: {
        console.log('\n--- DELETAR AUTOR ---');
        const idAutor = InputUtils.lerNumero('Digite o ID do autor que deseja deletar: ');
        
        try {
          const autorRepo = new AutorRepository();
          const deletado = await autorRepo.deletar(idAutor);
          
          if (deletado) {
            console.log('Sucesso: Autor deletado com sucesso! (Livros vinculados removidos por cascata).');
          } else {
            console.log('Aviso: Nenhum autor encontrado com o ID informado.');
          }
        } catch (error: any) {
          console.error('Erro ao deletar autor:', error.message);
        }
        break;
      }
      case 0: 
        console.log('\nEncerrando a aplicação... Até logo!'); 
        break;
      default: 
        console.log('\nOpção inválida!');
    }
  }
}