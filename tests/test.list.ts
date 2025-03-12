process.env.NODE_ENV = 'test';

import { test } from  "@playwright/test";

import health from "./health.test";

//import dotenvFlow from "dotenv-flow";
//dotenvFlow.config();

test.describe(health);
//test.describe