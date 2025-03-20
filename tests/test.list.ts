process.env.NODE_ENV = 'test';

import { test } from "@playwright/test";

// import test cases
import health from "./health.test";
import userTestCollection from "./user.test";
import productTestCollection from "./product.test";

// import models
import { userModel } from "../src/models/userModel";
import { productModel } from "../src/models/productModel";

import dotenvFlow from "dotenv-flow";
import { connect, disconnect } from "../src/repository/database";


dotenvFlow.config();

/**
 * Perform pre and post setup (clean-up db etc.)
 */
function setup() {
  //beforeEach clear test database
  test.beforeEach(async () => {
    try {
      await connect();
      await userModel.deleteMany({});
      await productModel.deleteMany({});
    }
    finally {
      await disconnect();
    }
  })
  //afterAll clear the testdatabase
  test.afterAll(async () => {
    try {
      await connect();
      await userModel.deleteMany({});
      await productModel.deleteMany({});
    }
    finally {
      await disconnect();
    }
  })
}

setup();

// add the test collections we want to run
test.describe(health); // simple health check test
test.describe(userTestCollection); // valid and in-valid test
test.describe(productTestCollection); // workflow test
// more tests...

