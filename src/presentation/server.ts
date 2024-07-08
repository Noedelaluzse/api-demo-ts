import express, {Router} from 'express';
import cors from 'cors';
import compression from 'compression';

interface Options {
  port: number;
  routes: Router,
  public_path?: string;
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;


  constructor(options: Options) {
    const { port, routes, public_path='public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {

    // Middlewares
    this.app.use(cors());
    this.app.use(express.json()); // For parsing application/json
    this.app.use(express.urlencoded({extended: true})); // For parsing application/x-www-form-urlencoded
    this.app.use(compression());

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