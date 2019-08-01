const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');

const letsVote = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  describe('Vote', async () => {
    await driver.get(
      'https://myleader.co.ke/mlk-officials-countrywide-voting/'
    );
    await driver.findElement(By.xpath("//a[@href='#health']")).click();
    let iframeSwitch = driver.findElement(
      By.xpath(
        "//iframe[@src='https://www.opinionstage.com/polls/2559731/poll?sembed=1&wid=2']"
      )
    );
    await driver.switchTo().frame(iframeSwitch);
    await driver
      .findElement(By.xpath("//label[contains(text(),'Okoth Onyango')]"))
      .click();

    await driver.findElement(
      By.xpath(
        '//*[@id="os-body"]/div[1]/div[3]/div/div[3]/div[1]/div[2]/div/a'
      ).click()
    );
    await driver.quit();
  });
};
const resultsScreenshot = async () => {
  await driver.get('https://myleader.co.ke/mlk-officials-countrywide-voting/');
  await driver.takeScreenshot().then(data => {
    let base64Data = data.replace(/^data:image\/png;base64,/, '');
    fs.writeFile('screenshot.png', base64Data, 'base64', err => {
      if (err) console.log(err);
    });
  });
};

let startTime = new Date().getTime();
const interval = setInterval(async () => {
  let currentTime = new Date();
  if (currentTime.getTime() - startTime > 600000) {
    clearInterval(interval);
    await resultsScreenshot();
    console.log('Finished, candidate is 9 votes ahead :)');
    return;
  }
  let time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  console.log(`Casting one vote at ${time}`);
  letsVote();
}, 60000);
