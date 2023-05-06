import { CredentialPlugin, CredentialPluginGetValue } from '@pesce-salato/mama-mia-plugin-helper'
import { type Page } from 'puppeteer-core'

const get = async (page: Page): Promise<CredentialPluginGetValue> => {
  // demo return value
  return {
    data: {},
    domain: 'domain.com',
    title: 'title'
  }
}

const apply = async (page, data) => {
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