import readline from 'readline-sync';
import { testConnection } from './database/connection.js';
import { AutorController } from './controllers/AutorController.js';
import { LivroController } from './controllers/LivroController.js';
import { ClienteController } from './controllers/ClienteController.js';
import { EmprestimoController } from './controllers/EmprestimoController.js';

const autorController = new AutorController();
const livroController = new LivroController();
const clienteController = new ClienteController();
const emprestimoController = new EmprestimoController();

async function menu() {
  await testConnection();

  let opcao = -1;

  while (opcao !== 0) {
    console.log('\n======================================');
    console.log('       BOOKSTORE MANAGER CLI          ');
    console.log('======================================');
    console.log('1. Cadastrar Autor');
    console.log('2. Listar Autores');
    console.log('--------------------------------------');
    console.log('3. Cadastrar Livro');
    console.log('4. Listar Livros');
    console.log('--------------------------------------');
    console.log('5. Cadastrar Cliente');
    console.log('6. Listar Clientes');
    console.log('--------------------------------------');
    console.log('7. Realizar Empréstimo');
    console.log('8. Registrar Devolução');
    console.log('9. Listar Empréstimos');
    console.log('--------------------------------------');
    console.log('0. Sair');
    console.log('======================================');

    opcao = readline.questionInt('Escolha uma opcao: ');

    switch (opcao) {
      case 1:
        await autorController.cadastrar();
        break;
      case 2:
        await autorController.listar();
        break;
      case 3:
        await livroController.cadastrar();
        break;
      case 4:
        await livroController.listar();
        break;
      case 5:
        await clienteController.cadastrar();
        break;
      case 6:
        await clienteController.listar();
        break;
      case 7:
        await emprestimoController.realizarEmprestimo();
        break;
      case 8:
        await emprestimoController.realizarDevolucao();
        break;
      case 9:
        await emprestimoController.listar();
        break;
      case 0:
        console.log('\n======================================');
        console.log('   Obrigado por utilizar o BookStore!  ');
        console.log('======================================\n');
        process.exit(0);
      default:
        console.log('Opção inválida!');
    }
  }
}

menu();
