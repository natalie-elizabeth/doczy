const webdriver = require('selenium-webdriver');
const chrome = require('chromedriver');
const By = webdriver.By;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
