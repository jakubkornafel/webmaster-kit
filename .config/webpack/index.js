const {join, resolve} = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const prod = require('./prod.config.js')
const dev = require('./dev.config.js')
const fs = require('fs')

module.exports = function(workspace) {
  if (workspace === true) {
    console.error(`\n Workspace name is required. \n\n Example: yarn dev website \n`)
    process.exit(0)
  }

  const envConfig = process.argv.indexOf('-p') !== -1 ? prod : dev
  const htmlConfig = getHTMLConfig(workspace)
  const config = merge(envConfig, {
    entry: `../workspaces/${workspace}`,
    output: {
      path: resolve(__dirname, '..', '..', `.build/${workspace}`),
    },
    plugins: [
      new HtmlWebpackPlugin(htmlConfig),
      new CleanWebpackPlugin([workspace], {root: join(__dirname, '../../.build')}),
    ]
  })

  return mergeWithCustomConfig(config, workspace)
}

function getHTMLConfig(workspace) {
  const html = {
    template: resolve(__dirname, `./template.html`)
  }
  const favicon = resolve(__dirname, `../../workspaces/${workspace}/favicon.ico`)
  const template = resolve(__dirname, `../../workspaces/${workspace}/index.html`)

  if (fs.existsSync(favicon)) { html.favicon = favicon }
  if (fs.existsSync(favicon)) { html.template = template}

  return html
}

function mergeWithCustomConfig(config, workspace) {
  const filepath = resolve(__dirname, `../../workspaces/${workspace}/webpack.config.js`)

  if (fs.existsSync(filepath)) {
    let customConfig = require(filepath)

    return typeof customConfig === 'function' ? customConfig(config) : customConfig
  }

  return config
}
