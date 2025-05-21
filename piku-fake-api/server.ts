import { Server } from '@/app';

class App {
  public static main() {
    const server = new Server();
    server.start();
  }
}

App.main();
