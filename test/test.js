const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');

// set target vote here
let targetVotes = 100;

const letsVote = async () => {
  describe('Vote automation', async () => {
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get(
      'https://www.opinionstage.com/polls/2559731/poll?sembed=1&wid=1'
    );
    await driver
      .findElement(By.xpath("//label[contains(text(),'Okoth Onyango')]"))
      .click();
    await driver
      .findElement(
        By.xpath(
          '//*[@id="os-body"]/div[1]/div[3]/div/div[3]/div[1]/div[2]/div/a'
        )
      )
      .click();
    await driver.quit();
  });
};

let count = 0;
const interval = setInterval(async () => {
  count += 1;
  let currentTime = new Date();
  if (count === targetVotes) {
    clearInterval(interval);
    await resultsScreenshot();
    console.log(`Finished, candidate is ${count - 1} votes ahead :)`);
    return;
  }
  let time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  console.log(`Casting vote ${count} at ${time}`);
  letsVote();
}, 5000);

const resultsScreenshot = async () => {
  let driver = new Builder().forBrowser('chrome').build();
  await driver.get(
    'https://www.opinionstage.com/polls/2559731/poll?sembed=1&wid=1'
  );
  await driver.takeScreenshot().then(data => {
    let base64Data = data.replace(/^data:image\/png;base64,/, '');
    fs.writeFile('screenshot.png', base64Data, 'base64', err => {
      if (err) console.log(err);
    });
  });
  await driver.quit();
};
