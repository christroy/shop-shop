const db = require('./connection');
const { User, Product, Category } = require('../models');
const faker = require("faker");
const dotenv = require("dotenv");
dotenv.config();

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Paper' },
    { name: 'Office Supplies' },
    { name: 'Electronics' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const productData = []
  
  for(let i=0; i<20; i++) {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.image(),
      category: categories[0]._id,
      price: faker.commerce.price(),
      quantity: Math.floor(Math.random() *20),
    }
    productData.push(product);

  }
  const products = await Product.insertMany(productData);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'James',
    lastName: 'Wright',
    email: 'James@testmail.com',
    password: 'cp855010',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Chris',
    lastName: 'Richards',
    email: 'chrispodoba@gmail.com',
    password: 'cp855010'
  });

  console.log('users seeded');

  process.exit();
});
