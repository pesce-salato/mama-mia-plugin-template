import { CredentialPlugin, CredentialPluginGetValue } from '@pesce-salato/mama-mia-plugin-helper'
import { type Page, type Browser } from 'puppeteer-core'

const get = async (browser: Browser): Promise<CredentialPluginGetValue> => {
  // demo return value
  return {
    data: {},
    domain: 'domain.com',
    title: 'title'
  }
}

const apply = async (page: Page, data) => {
    // demo
    return true
}

const clear = async (page) => {
    // demo
    return true
}

export const plugin: CredentialPlugin = {
  get,
  apply,
  clear
}