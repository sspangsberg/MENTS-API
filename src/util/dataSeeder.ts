import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";

// Project import
import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";
import { connect, disconnect } from "../repository/database";

dotenvFlow.config();

/**
 * Seed the database with data
 */
export async function seed() {
  try {
    await connect();

    await deleteAllData();
    await seedData();
    console.log("Seeding process completed successfully...");
    process.exit();
  } catch (err) {
    console.log("Error Seeding data." + err);
  }
  finally {
    await disconnect();
  }
};

/**
 * Delete all data from the database
 */
export async function deleteAllData() {
  await productModel.deleteMany();
  await userModel.deleteMany();

  console.log("Cleared data successfully...");
};

/**
 * Seed data into the database
 */
export async function seedData() {
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("12345678", salt);

  const user1 = new userModel();
  user1.name = "Peter Petersen";
  user1.email = "peter@petersen.com";
  user1.password = passwordHash;
  await user1.save();

  const user2 = new userModel();
  user2.name = "Heidi Jensen";
  user2.email = "heidi@jensen.com";
  user2.password = passwordHash;
  await user2.save();

  const user3 = new userModel();
  user3.name = "Mr Burns";
  user3.email = "mr@burns.com";
  user3.password = passwordHash;
  await user3.save();

  const products = [
    {
      name: "Product #1 (made by Peter)",
      description: "Product #1 description",
      imageURL: "https://picsum.photos/500/500",
      price: 2,
      stock: 20,
      discount: true,
      discountPct: 10,
      isHidden: false,
      _createdBy: user1.id,
    },
    {
      name: "Product #2 (made by Peter)",
      description: "Product #2 description",
      imageURL: "https://picsum.photos/500/500",
      price: 100.96,
      stock: 0,
      discount: true,
      discountPct: 25,
      isHidden: false,
      _createdBy: user1.id,
    },
    {
      name: "Product #3 (made by Heidi)",
      description: "Product #3 description",
      imageURL: "https://picsum.photos/500/500",
      price: 192.96,
      stock: 150,
      discount: false,
      discountPct: 0,
      isHidden: false,
      _createdBy: user2.id,
    },
    {
      name: "Product #4 (made by Heidi)",
      description: "Product #4 description",
      imageURL: "https://picsum.photos/500/500",
      price: 594.91,
      stock: 0,
      discount: false,
      discountPct: 0,
      isHidden: false,
      _createdBy: user2.id,
    },
  ];

  await productModel.insertMany(products);

  console.log("Seeded data successfully...");
};

// start the actual seeding
seed();