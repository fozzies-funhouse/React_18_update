const {
  db,
  models: { User, Product, Tag, productTags },
} = require("../server/db");

const fs = require("fs");

const userData = JSON.parse(fs.readFileSync("UserData.json", "utf8"));

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  // seed users
  await Promise.all(userData.map((user) => User.create(user)));

  // seed tags
  let sneakerBrands = ["Nike", "Converse", "Addidas", "Vans", "Jordans"];
  for (let i = 0; i < sneakerBrands.length; i++) {
    let tag = {
      category: sneakerBrands[i],
    };
    await Tag.create(tag);
  }

  // seed products & associate tags
  const productData = JSON.parse(fs.readFileSync("ProductData.json", "utf8"));

  for (let i = 0; i < productData.length; i++) {
    const product = await Product.create(productData[i]);
    console.log(`${product.name} average rating:`, product.rating)
    await productTags.create({
      productId: i + 1,
      tagId: (i % sneakerBrands.length) + 1,
    });
  }

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

if (module === require.main) {
  runSeed();
}
