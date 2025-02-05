import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';


dotenvFlow.config();

// create express application
const app: Application = express();



/**
 * 
 */
export function startServer() {

    // JSON body parser
    app.use(express.json());

    // bind routes to the app
    app.use('/api', routes);

    // test the connection to the database
    testConnection();

    // start the server
    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log("Server is up and running on port: " + PORT);
    });
}
