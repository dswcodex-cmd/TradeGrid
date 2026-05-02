require('dotenv').config();
const Groq = require('groq-sdk');
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const sql  = neon(process.env.DATABASE_URL);

const IMAGE_PATH = './test-image.jpg';

function fixJSON(str) {
  let clean = str
    .replace(/```json|```/g, '')
    .replace(/}\s*}/g, '}')
    .trim();
  const opens  = (clean.match(/{/g) || []).length;
  const closes = (clean.match(/}/g) || []).length;
  if (opens > closes) clean += '}'.repeat(opens - closes);
  return clean;
}

async function run() {


  console.log('Identifying product from image...');

  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  const base64Image = imageBuffer.toString('base64');

  const aiResponse = await groq.chat.completions.create({
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
          {
            type: 'text',
            text: `Identify the product in this image.
Return ONLY a raw JSON object — no markdown, no backticks — in this exact shape:
{"product_name":"..."}`,
          },
        ],
      },
    ],
  });

  const productInfo = JSON.parse(fixJSON(aiResponse.choices[0].message.content.trim()));
  console.log(`✅ Product identified: "${productInfo.product_name}"`);


  console.log('\nFetching all products from database...');
  const allProducts = await sql`SELECT product_id, product_name FROM "Product"`;
  console.log(`   Found ${allProducts.length} products in database`);

  if (allProducts.length === 0) {
    console.log('No products in database at all.');
    return;
  }

 
  console.log('\nAI is checking which database products are related...');

  const productList = allProducts.map(p => `- ${p.product_name}`).join('\n');

  const matchResponse = await groq.chat.completions.create({
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `The user is searching for companies that supply: "${productInfo.product_name}"

Here is a list of products in our database:
${productList}

Your job: decide which of these database products are related to or fall under what the user is looking for.
A product is related if it is the same thing, a type of it, a part of it, or serves the same purpose.
For example: if searching for "car", then "vehicle", "automobile", "SUV", "sedan" are all related.

Return ONLY a raw JSON array of the matching product names — no markdown, no backticks.
Example: ["vehicle","automobile","SUV"]
If none are related return an empty array: []`,
      },
    ],
  });

  let matchedNames = [];
  try {
    const raw = matchResponse.choices[0].message.content.trim().replace(/```json|```/g, '').trim();
    matchedNames = JSON.parse(raw);
  } catch {
    console.log('Could not parse AI matching response, falling back to product name only');
    matchedNames = [];
  }

  console.log(`   AI matched these database products: ${matchedNames.length > 0 ? matchedNames.join(', ') : 'none'}`);

 
  const exactMatches = allProducts
    .filter(p => p.product_name.toLowerCase().includes(productInfo.product_name.toLowerCase()))
    .map(p => p.product_name);

  const allMatchedNames = [...new Set([...matchedNames, ...exactMatches])];

  if (allMatchedNames.length === 0) {
    console.log(`\n No related products found in database for "${productInfo.product_name}"`);
    return;
  }

 
  const matchedProducts = allProducts.filter(p =>
    allMatchedNames.some(name => name.toLowerCase() === p.product_name.toLowerCase())
  );
  const matchedIds = matchedProducts.map(p => p.product_id);


  console.log('\n Finding companies that supply related products...');

  const companies = await sql`
    SELECT
      c.company_id,
      c.company_name,
      c.business_type,
      c.company_description,
      c.year_established,
      c.number_of_employees,
      l.country,
      i.industry_name,
      p.product_name AS matched_product
    FROM "Company" c
    JOIN "CompanyProducts" cp ON cp.company_id = c.company_id
    JOIN "Product" p          ON p.product_id  = cp.product_id
    LEFT JOIN "Location" l    ON l.location_id = c.location_id
    LEFT JOIN "Industry" i    ON i.industry_id = c.industry_id
    WHERE p.product_id = ANY(${matchedIds})
    ORDER BY c.company_name ASC
  `;

 
  const seen = new Set();
  const uniqueCompanies = companies.filter(c => {
    if (seen.has(c.company_id)) return false;
    seen.add(c.company_id);
    return true;
  });

  
  if (uniqueCompanies.length === 0) {
    console.log(`\nNo companies found that supply "${productInfo.product_name}" or anything related`);
  } else {
    console.log(`\n✅ Found ${uniqueCompanies.length} company(s):\n`);
    uniqueCompanies.forEach((c, i) => {
      console.log(`${i + 1}. ${c.company_name}`);
      console.log(`   Matched Product: ${c.matched_product}`);
      console.log(`   Industry       : ${c.industry_name        || 'N/A'}`);
      console.log(`   Business Type  : ${c.business_type}`);
      console.log(`   Country        : ${c.country              || 'N/A'}`);
      console.log(`   Established    : ${c.year_established     || 'N/A'}`);
      console.log(`   Employees      : ${c.number_of_employees  || 'N/A'}`);
      console.log(`   Description    : ${c.company_description  || 'N/A'}`);
      console.log('');
    });
  }
}

run().catch(err => console.error('❌ Error:', err.message));
