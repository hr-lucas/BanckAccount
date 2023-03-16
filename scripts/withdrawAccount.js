import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs'
import { checkAccount } from '../helpers/checkAccout.js'
import { getAccount } from '../helpers/getAccount.js'

export const withDrawAccount = async () => {
  const { accountName } = await inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  if (!checkAccount(accountName)) return await withDrawAccount()
  else await muchWithDraw(accountName)

}

const muchWithDraw = async (accountName) => {
  const { amount } = await inquirer.prompt([
    {
      name: 'amount',
      message: 'Quanto você deseja sacar?'
    }
  ])
  await removeAmount(accountName, amount)
}

const removeAmount = (accountName, amount) => {
  const accountData = getAccount(accountName)

  if (!amount) return console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')), withDrawAccount()

  if (accountData.balance < amount) return console.log(chalk.bgRed.black(`Valor indisponível! Saldo em conta é de R$ ${accountData.balance}`)), withDrawAccount()

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => {
    console.log(err)
  })

  console.log(chalk.green(`Foi realizado um saque de R$ ${amount} da sua conta!! Seu saldo é de ${accountData.balance}`))
} 