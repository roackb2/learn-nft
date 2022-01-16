#!/usr/bin/env node
require('dotenv').config()
const program = require('commander')
const deploy = require('./deploy')
const {
  listAccounts,
  getBalance
} = require('./actions')

program
  .command('deploy')
  .description('Deploy legs-nft program')
  .action(deploy)

program
  .command('list-accounts')
  .description('List all accounts')
  .action(listAccounts)

program
  .command('get-balance')
  .description('Get account balance')
  .action(getBalance)

program.parse(process.argv)
