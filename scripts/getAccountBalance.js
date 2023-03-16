import inquirer from 'inquirer';
import chalk from 'chalk'
import { checkAccount } from '../helpers/checkAccout.js'
import { getAccount } from '../helpers/getAccount.js'


export const getAccountBalance = async () => {
  try {
    const { accountName } = await inquirer.prompt([
      {
        name: 'accountName',
        message: 'Insira numero da conta'
      }
    ])
    if (!checkAccount(accountName)) return await getAccountBalance()

    const accountData = await getAccount(accountName)
    console.log(chalk.bgBlue.black(
      `Olá o saldo da sua conta é de ${chalk.bgGreen.white(`R$ ${accountData.balance}`)}`
    ))
  } catch (error) {
    return `Ocorreu algum erro insperado`
  }
};