import express from 'express';
import { config } from '@/config/config';

export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public start() {
    this.serverListen();
  }

  private serverListen() {
    this.app.listen(config.port, () => {
      console.log(`Server is running on ${config.node_env === 'DEVELOPMENT' && `http://localhost:${config.port}`} in ${config.node_env} mode`);
    });
  }

}
