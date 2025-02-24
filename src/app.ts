import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';
import cors from 'cors';


dotenvFlow.config();

// create express application
const app: Application = express();


/**
 *
 */
export function setupCors() {

    // kw 2-dec-2024 - Working CORS setup without credentials. Could refactor
    app.use(
        cors({
            origin: "*", // Allow requests from any origin
            // kw 29-nov-2024 - allow methods + headers + credentials
            methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
            allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specific headers
            credentials: true,
        })
    );
    /*
        // kw 2-dec-2024 - set the Access-Control-Allow-Origin header for preflight requests - console error 
        app.options('*', (req: Request, res: Response) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept');
            // test for credentials
            res.header('Access-Control-Allow-Credentials', 'true');
            res.sendStatus(200);
        });
        */
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

    // test the connection to the database
    testConnection();

    // start the server
    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log("Server is up and running on port: " + PORT);
    });
}
