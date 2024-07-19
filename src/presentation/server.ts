import express, {Router} from 'express';
import cors from 'cors';
import compression from 'compression';
import { MongoDatabase } from '../data/mongo';
import fileUpload from 'express-fileupload';

interface Options {
  port: number;
  routes: Router,
  public_path?: string;
  mongoUrl: string;
  dbName: string;
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private readonly mongoUrl: string;
  private readonly dbName: string;


  constructor(options: Options) {
    const { port, routes, public_path='public', mongoUrl, dbName } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
    this.mongoUrl = mongoUrl;
    this.dbName = dbName;
  }

  async start() {

    await MongoDatabase.connect({
      mongoUrl: this.mongoUrl,
      dbName:  this.dbName
    });

    // Middlewares
    this.app.use(cors());
    this.app.use(express.json()); // For parsing application/json
    this.app.use(express.urlencoded({extended: true})); // For parsing application/x-www-form-urlencoded
    this.app.use(compression());
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      limits: { fileSize: 50 * 1024 * 1024 },
  }));
    // Public Folder
    this.app.use(express.static(this.publicPath));

    // Routes 
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });

  }

  public close() {
    this.serverListener?.close();
  }
}