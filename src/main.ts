import { testConnection } from './database/connection.js';
import { exibirMenuPrincipal } from './menus/menuPrincipal.js';

async function bootstrap() {
  await testConnection();
  await exibirMenuPrincipal();
}

bootstrap();