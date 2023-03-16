import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs'

export async function createdAccoutn() {
  console.log(chalk.bgGreen.black("Paranbéns por escolher nosso banco!"))
  console.log(chalk.green("Defina as opções da sua conta a seguir"))
  await buildAccoutn()
}

async function buildAccoutn() {
  const { accountName } = await inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para sua conta:'
    }
  ])
  console.info(accountName)
  if (!fs.existsSync('accounts')) {
    fs.mkdirSync('accounts')
  }
  if (fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Está conta já existe, escola outro nome!'))
    buildAccoutn()
  }
  await fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}')
  console.log(chalk.green('Parabéns, a sua conta foi criada!'))
}