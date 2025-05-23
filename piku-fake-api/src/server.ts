import { Server } from './app.js';
import '@/jobs/worker/product.worker.js';

class App {
  public static main() {
    const server = new Server();
    server.start();
  }
}

App.main();
