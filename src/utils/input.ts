import readline from 'readline-sync';

import { execSync } from 'child_process';

/* Forçar o terminal a utilizar a codificação UTF-8 */
try {
  if (process.platform === 'win32') {
    execSync('chcp 65001', { stdio: 'ignore' });
  }
} catch {
}

/* Configura o terminal para interpretar caracteres especiais*/
process.stdin.setEncoding('utf-8');
export class InputUtils {
  static lerTexto(mensagem: string): string {
    return readline.question(mensagem).trim();
  }

  static lerNumero(mensagem: string): number {
    const valor = readline.questionInt(mensagem);
    return valor;
  }
}

