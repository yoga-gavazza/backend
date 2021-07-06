import routes from '@routes';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { Mongoose } from 'mongoose';
import { ReplaySubject } from 'rxjs';
import { connectDb, PORT } from './config';

export default class RestApi {
  private app: Express;

  private mongoose: Mongoose | null = null;

  private ready = new ReplaySubject<void>();

  constructor() {
    this.app = express();
    this.configureAll();
  }

  get expressApp(): Express {
    return this.app;
  }

  get mongooseInstance(): Mongoose | null {
    return this.mongoose;
  }

  listen(port: number = Number(PORT) || 3000): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ready.subscribe(
        () => {
          // eslint-disable-next-line no-console
          this.app.listen(
            port,
            console.log.bind(console, `\nREST Api started on port ${port}`),
          );
          resolve();
        },
        (error: any) => {
          // eslint-disable-next-line no-console
          console.log('\nError on start application: ', error);
          reject(error);
        },
      );
    });
  }

  private async configureAll(): Promise<void> {
    this.mongoose = await connectDb();
    this.configureGlobalHandlers();
    this.configureRoutes();
    this.ready.next();
  }

  private configureGlobalHandlers(): void {
    this.app.use('/', express.static('/public'));
    this.app.use('/docs', express.static('/docs'));
    this.app.use(helmet());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(cors());
  }

  private configureRoutes(): void {
    this.app.use(routes);
  }
}
