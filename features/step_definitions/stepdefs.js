const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');


// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the localhost login page', async function () {
    await driver.get('http://localhost:3000/#/login');
});

When('I enter {string} in the {string}', async function (enter, field) {
    const element = await driver.findElement(By.name(field));
    element.sendKeys(enter, Key.RETURN);
});

When('I submit {string}', async function (field) {
    await driver.findElement(By.name(field)).submit();
});

Then('Im logged in', {timeout: 60 * 1000}, async function () {
    expect(driver.getCurrentUrl() === "http://localhost:3000/#/")
});

AfterAll('end', async function(){
    await driver.quit();
});