import fs from 'fs';

export function getAccount(accountName) {
  const accoutnJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })
  return JSON.parse(accoutnJSON)
}