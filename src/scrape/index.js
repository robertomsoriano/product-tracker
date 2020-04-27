import axios from 'axios'
import cheerio from 'cheerio'

// Get page html
export async function getHTML(productURL) {
    const { data: html } = await axios.get(productURL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        }
    })
        .catch(function (error) {
            console.log(error);
        })
    return html;
}

// Parse product data
export async function getAmazonProductData(html) {
    const $ = cheerio.load(html)

    //Product info
    const price = await $('#priceblock_ourprice').html() || $('#priceblock_saleprice').html()
    const title = await $("#productTitle").html().replace(/\s\s+/g, " ")
    const rating = await $('.a-icon-alt').html()
    const reviewCount = await $("#acrCustomerReviewText").html()
    const productImage = await $('#landingImage').attr('data-old-hires');
    const availability = await $("#availability").find('span').text().replace(/\s\s+/g, "")
    const features = await $('#feature-bullets ul li').find('span').text().replace(/\s\s+/g, " \n ")
    // const comparableItems = await $('#HLCXComparisonTable .comparison_table_image_row .a-link-normal').html()

    const product = {
        title,
        price,
        rating,
        reviewCount,
        productImage,
        features,
        availability
        // comparableItems
    }
    return await product
}


const productCode = `B08235KN9V`

const productURL = `https://www.amazon.com/Simple-Mobile-Prepaid-Iphone-Carrier/dp/${productCode}`

export async function scrapePage() {
    const html = await getHTML(productURL);
    const amazonProduct = await getAmazonProductData(html);
    // console.log(`The price is ${JSON.stringify(amazonProduct)}`);
    return amazonProduct
}