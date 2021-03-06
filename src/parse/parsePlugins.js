const globalInfo = require('../globalInfo')

function getPlugins(funcName) {
  return globalInfo.configs.plugins
    .map(plugin => (typeof plugin === 'string' ? require(plugin) : plugin))
    .filter(plugin => Object.prototype.hasOwnProperty.call(plugin, funcName))
    .map(plugin => plugin[funcName])
}

const beforeUlkaParse = getPlugins('beforeUlkaParse')
const afterUlkaParse = getPlugins('afterUlkaParse')

const beforeMdParse = getPlugins('beforeMdParse')
const afterMdParse = getPlugins('afterMdParse')

const beforeBuild = getPlugins('beforeBuild')
const afterBuild = getPlugins('afterBuild')

const remarkPlugins = getPlugins('remarkablePlugin')

module.exports = {
  beforeUlkaParse,
  afterUlkaParse,
  beforeMdParse,
  remarkPlugins,
  afterMdParse,
  beforeBuild,
  afterBuild
}
