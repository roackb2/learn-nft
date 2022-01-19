#!/usr/bin/env node
require('dotenv').config()
const program = require('commander')
const deploy = require('./deploy')
const {
  listAccounts,
  getBalance,
  mint
} = require('./actions')

program
  .command('deploy')
  .description('Deploy learn-nft program')
  .action(deploy)

program
  .command('list-accounts')
  .description('List all accounts')
  .action(listAccounts)

program
  .command('get-balance')
  .description('Get account balance')
  .action(getBalance)

program
  .command('mint')
  .description('Mint our Epic NFT')
  .action(mint)

program.parse(process.argv)
