import fs from 'fs';
import chalk from 'chalk';

export function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Está conta não existe, escolha outro nome!'))
    return false
  } else return true
}