'use strict';

const {
  db,
  models: { User, Product, Tag, productTags },
} = require('../server/db');

const fs = require('fs');

const userData = JSON.parse(fs.readFileSync('UserData.json', 'utf8'));

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // seed users
  await Promise.all(userData.map((user) => User.create(user)));

  // seed tags
  let sneakerBrands = ["Nike", "Converse", "Addidas", "Vans", "Jordans"]
  for (let i = 0; i < sneakerBrands.length; i++){
    let tag = {
      category: sneakerBrands[i]
    }
    await Tag.create(tag)
  }

  // seed products & associate tags
  for (let i = 0; i < 20; i++){
    const product = {
      name: `model prototype ${i}`,
      price: 100,
      inventory: 1,
      image_url: "https://cdn.shopify.com/s/files/1/1042/5868/products/aa0028906.jpg?v=1634928694",
      model_url: "../public/jedi_star_fighter/scene.gltf"
    }
    await Product.create(product);
    productTags.create({
      productId: i+1,
      tagId: (i % sneakerBrands.length) + 1,
    })
  }

  //////// test seed a product by uncommenting and inserting custom data

  // const customProduct = {
  //   name: "",
  //   price: 100,
  //   inventory: 1,
  //   image_url: "",
  //   model_url: "your model location"
  // }

  // await Product.create(customProduct)

  ////// uncomment to use "real data" from JSON
  const productData = JSON.parse(fs.readFileSync('ProductData.json', 'utf8'));
  await Promise.all(productData.map((product) => Product.create(product)));

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
