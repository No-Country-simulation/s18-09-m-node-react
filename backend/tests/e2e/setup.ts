import Server from "../../src/config/server";

let server: Server;

beforeAll(async () => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  server = new Server();
});

afterAll(() => {
  server.close();
  jest.restoreAllMocks();
});

export const getServerUrl = () => `http://localhost:${process.env.PORT}` 
