import { InputUtils } from '../utils/input.js';
import { AutorController } from '../controllers/AutorController.js';
import { LivroController } from '../controllers/LivroController.js';
import { ClienteController } from '../controllers/ClienteController.js';
import { EmprestimoController } from '../controllers/EmprestimoController.js';
import { LivroRepository } from '../repositories/LivroRepository.js';

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
10.  Relatórios Gerenciais
0. Sair
=========================================`);

    opcao = InputUtils.lerNumero('Escolha uma opção: ');

    switch (opcao) {
      case 1: await autorCtrl.cadastrar(); break;
      case 2: await autorCtrl.listar(); break;
      case 3: await livroCtrl.cadastrar(); break;
      case 4: await livroCtrl.listar(); break;
      case 5: await clienteCtrl.cadastrar(); break;
      case 6: await clienteCtrl.listar(); break;
      case 7: await emprestimoCtrl.realizarEmprestimo(); break;
      case 8: await emprestimoCtrl.realizarDevolucao(); break;
      case 9: await emprestimoCtrl.listar(); break;
      case 10:
        case 10:
  const livroRepo = new LivroRepository();
  const relatorio = await livroRepo.listarLivrosComAutores();
  console.log('\n--- RELATÓRIO: LIVROS E AUTORES ---');
  console.table(relatorio);
  break;
      case 0: console.log('\nEncerrando a aplicação... Até logo!'); break;
      default: console.log('\nOpção inválida!');
    }
  }
}


