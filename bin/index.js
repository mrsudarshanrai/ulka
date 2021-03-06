#!/usr/bin/env node

const { program } = require('commander')
require('colors')

const build = require('./build')
const serve = require('./serve')
const { version } = require('../package.json')
const create = require('./create')
const globalInfo = require('../src/globalInfo')
const { beforeBuild, afterBuild } = require('../src/parse/parsePlugins')

program.version(version)
program
  .command('build')
  .description('Build static files')
  .action(async () => {
    console.log('\n>> Building static files'.yellow)

    for (let i = 0; i < beforeBuild.length; i++) {
      const plugin = beforeBuild[i]
      await plugin(globalInfo)
    }

    const startBuild = new Date().getTime()
    await build()
    const finishBuild = new Date().getTime()

    for (let i = 0; i < afterBuild.length; i++) {
      const plugin = afterBuild[i]
      await plugin(globalInfo)
    }

    console.log(
      `>> Build finished in`.yellow,
      `${finishBuild - startBuild} ms`.yellow.bold
    )
  })

program
  .command('serve [port]')
  .description('Creates live server and serve static sites')
  .action(async port => {
    await build()
    await serve(port)
  })

program
  .command('create <projectName> [template]')
  .description('Generates ulka project')
  .action(create)

program.parse(process.argv)
