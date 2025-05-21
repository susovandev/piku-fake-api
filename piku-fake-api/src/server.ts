import { Server } from './app.js';

class App {
  public static main() {
    const server = new Server();
    server.start();
  }
}

App.main();
