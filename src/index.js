const { getHTML, getAmazonProductData } = require("./scrape.js");

const productURL = `https://www.amazon.com/Simple-Mobile-Prepaid-Iphone-Carrier/dp/B07XLGM7L1`;
async function scrapePage() {
  const html = await getHTML(productURL);
  const amazonProduct = await getAmazonProductData(html);
  console.log(`The price is ${JSON.stringify(amazonProduct)}`);
}

scrapePage();
