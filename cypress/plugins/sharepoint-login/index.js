'use strict'

const spauth = require('node-sp-auth');
const puppeteer = require('puppeteer');

/**
 * SharePoint authentication via puppeteer
 * 
 * @param {options.username} string username
 * @param {options.password} string password
 * @param {options.pageUrl} string URL of the SharePoint page
 */
module.exports.SharePointLogin = async function (options = {}) {

  // Check if the required options are provided
  if (!options.username || !options.password) {
    throw new Error('Username or password missing.');
  }
  if (!options.pageUrl) {
    throw new Error('Login Url missing')
  }

  // Authenticate
  const data  = await spauth.getAuth(options.pageUrl, {
    username: options.username,
    password: options.password
  });
  
  // Launch puppeteer to get the SP Headers
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders(data.headers);
  await page.goto(options.pageUrl, {
    waitUntil: 'load'
  });

  // Retrieve the cookies from the browser session
  const cookies = await getCookies({ page, options });
  await finalizeSession({ page, browser, options });

  // Return the browser cookies
  return { cookies }
}

async function getCookies({ page, options } = {}) {
  // Wait for an element on the SharePoint page
  await page.waitForSelector("#SuiteNavPlaceHolder", { visible: true, delay: 10000 })
  // Retrieving all the cookies
  const cookies = options.getAllBrowserCookies
  ? await getCookiesForAllDomains(page)
  : await page.cookies(options.pageUrl)
  if (options.logs) {
    console.log(cookies)
  }
  return cookies
}

async function getCookiesForAllDomains(page) {
  const cookies = await page._client.send('Network.getAllCookies', {})
  return cookies.cookies
}

async function finalizeSession({ page, browser, options } = {}) {
  await browser.close()
}