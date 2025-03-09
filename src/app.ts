
import express, { Application } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';
import { setupDocs } from './util/documentation';
import cors from 'cors';

dotenvFlow.config();

// create express application
const app: Application = express();

/**
 * Setup CORS handling
 */
function setupCors() {

  app.use(cors({

    // Allow request from any origin
    origin: "*",

    // allow HTTP methods
    methods: 'GET, PUT, POST, DELETE',

    // allow headers
    allowedHeaders: ['auth-token', 'Origin', 'X-Requested-Width', 'Content-Type', 'Accept'],

    // allow credentials
    credentials:true
  }))
}

/**
 * 
 */
export function startServer() {

  setupCors();
    
  // JSON body parser
  app.use(express.json());

  // bind routes to the app
  app.use('/api', routes);

  setupDocs(app);

  // test the connection to the database
  testConnection();

  // start the server
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, function () {
    console.log("Server is up and running on port: " + PORT);
  });
}
