const fs = require('fs')
const moment = require('moment')
const { spawn } = require('child_process')

const defaultOptions = {
  bundleName: 'test.war',
  implementationTitle: 'untitled',
  implementationVersion: '0.0.1',
  implementationVersionApi: '1',
}

module.exports = class WebpackWarPlugin {

  constructor(options) {
    this.options = Object.assign(
      defaultOptions,
      options
    )
  }

  createDirectories() {
    if (!fs.existsSync(this.metaDir)) {
      fs.mkdirSync(this.metaDir)
    }
    if (!fs.existsSync(this.webDir)) {
      fs.mkdirSync(this.webDir)
    }
  }

  createManifest() {
    fs.writeFileSync(
      `${ this.metaDir }/MANIFEST.MF`,
      [
        'Manifest-Version: 1.0',
        `Implementation-Title: ${ this.options.implementationTitle }`,
        `Implementation-Version: ${ this.options.implementationVersion }`,
        `Implementation-Version-Api: ${ this.options.implementationVersionApi }`,
        `Built-Date: ${ moment().format("YYYY-MM-DD HH:mm:ss") }`,
      ].join('\n')
    )
  }

  createWebConfig() {
    fs.writeFileSync(
      `${ this.webDir }/web.xml`,
      "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n<!DOCTYPE web-app\n    PUBLIC \"-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN\"\n    \"http://java.sun.com/dtd/web-app_2_3.dtd\">\n<web-app>\n  <welcome-file-list>\n     <welcome-file>index.html</welcome-file>\n  </welcome-file-list>\n</web-app>"
    );
  }

  pack() {
    spawn(
      `zip`,
      ['-r', this.options.bundleName, '.'], {
        cwd: this.rootDir
      }
    )
  }

  apply(compiler) {
    compiler.plugin(
      'compilation', (compilation, callback) => {
      }
    )
    compiler.plugin(
      'emit', (compilation, callback) => {
        callback()
      }
    )
    compiler.plugin(
      'done', (compilation, callback) => {
        this.rootDir = compiler.outputPath
        this.metaDir = `${ this.rootDir }/META-INF`
        this.webDir = `${ this.rootDir }/WEB-INF`
        this.createDirectories()
        this.createManifest()
        this.createWebConfig()
        this.pack()
      }
    )
  }  

}
