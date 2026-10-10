import readline from 'readline-sync';

export class InputUtils {
  static lerTexto(mensagem: string): string {
    return readline.question(mensagem).trim();
  }

  static lerNumero(mensagem: string): number {
    const valor = readline.questionInt(mensagem);
    return valor;
  }
}

