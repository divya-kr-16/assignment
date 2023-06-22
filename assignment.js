const puppeteer = require('puppeteer');

(async () => {
  async function getFlightPrices() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const source = 'Delhi';
    const destination = 'Jaipur';
    const date = '15 April 2023';

    const url = `https://www.google.com/travel/flights?cs=0&output=search&source=flun&uitype=cuAA&hl=en&gl=in&curr=INR&tfs=CAEQAhopEgoyMDIzLTA3LTE1agwIAhIIL20vMGRsdjByDQgCEgkvbS8wMTY3MjJ6aENqUklkRXhwYXpaWlgwSjVWRTFCUTNVdFdtZENSeTB0TFMwdExTMHRlWE5pWW1jME1rRkJRVUZCUjFOVlEwSnJUa1psV1VGQkVnTnVTVFVhQ2dpS0VoQUFHZ05KVGxJNEEzQ0pGZz09&ved=2ahUKEwi_wc65vNb_AhUUjIkEHQnYBcQQlhd6BAgpECg`;

    await page.goto(url);
    await page.waitForSelector('.gws-flights-results__collapsed-itinerary', { timeout: 60000 });

    const flightPrices = await page.evaluate(() => {
      const airlines = document.querySelectorAll('.gws-flights-results__collapsed-itinerary .gws-flights-results__carrier-name');
      const prices = document.querySelectorAll('.gws-flights-results__collapsed-itinerary .gws-flights-results__price');

      const results = {};
      airlines.forEach((airline, index) => {
        const airlineName = airline.textContent.trim();
        const price = prices[index].textContent.trim();
        results[airlineName] = price;
      });

      return results;
    });

    console.log(flightPrices);

    await browser.close();
  }

  await getFlightPrices();
})();
