// Modulos internos
import { createdAccoutn } from './scripts/createdAccoutn.js'
import { deposit } from './scripts/depositAccoutn.js'
import { getAccountBalance } from './scripts/getAccountBalance.js'
import { withDrawAccount } from './scripts/withdrawAccount.js'
import inquirer from 'inquirer';
import chalk from 'chalk';

operation()
function operation() {
  inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'O que você deseja fazer?',
    choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair']
  }]).then((answer) => {
    const action = answer['action']
    switch (action) {
      case 'Criar conta':
        createdAccoutn().then(() => {
          operation();
        }).catch((err) => {
          console.log(err)
        })
        break;
      case 'Consultar saldo':
        getAccountBalance().then(() => {
          operation();
        }).catch((err) => {
          console.log(err)
        })
        break;
      case 'Depositar':
        deposit().then(() => {
          operation();
        }).catch((err) => {
          console.log(err)
        })
        break;
      case 'Sacar':
        withDrawAccount().then(() => {
          operation();
        }).catch((err) => {
          console.log(err)
        })
        break;
      default:
        console.log(chalk.bgBlue.black('Obrigado por usar o Accoutns!'))
        process.exit()

    }
  }).catch((err) => console.log(err))
}


