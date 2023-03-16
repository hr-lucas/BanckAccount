import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs'
import { checkAccount } from '../helpers/checkAccout.js'
import { getAccount } from '../helpers/getAccount.js'

export async function deposit() {
  try {
    const { accountName } = await inquirer.prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    if (!checkAccount(accountName)) return await deposit()
    else await sendAmount(accountName)
  } catch (err) {
    console.log(err)
  }
}

async function sendAmount(accountName) {
  try {
    const { amount } = await inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja depositar'
      }
    ])
    // ADD and amount
    addAmount(accountName, amount)
  } catch (err) {
    console.log(err)
  }
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)
  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'));
    return deposit();
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => {
    console.log(err)
  })
  console.log(chalk.green(`Foi depositado o valor de R$${amount} na conta ${accountName}!`))
}

