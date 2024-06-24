import { Client, Config } from './passwordless'; // Adjust the import to match your file structure

describe('ClientSDK', () => {
  let client: Client;

  beforeEach(() => {
    let options: Config = {
      apiUrl: 'http://localhost:8080',
      apiKey: 'public:app1:123',
      origin: 'https://pwdemo',
      rpid: 'pwdemo'
    };
    client = new Client(options);
  });

  test('should set valid client version format', () => {
    const validVersions = ['js-1.0.0', 'blazor-2.3.2', 'android-5.4.3'];

    validVersions.forEach((version) => {
      client.clientVersion = version;
      expect(client.clientVersion).toBe(version);
    });
  });

  test('should throw error for invalid client version format', () => {
    const invalidVersions = [
      '1.0.0', // Missing prefix
      'Js-1.0.0', // Uppercase prefix
      'blazor-2.3', // Missing patch version
      'android-5.4.3.0', // Extra version number
      'android-5.4', // Missing patch version
      'android-5..3' // Double dot
    ];

    invalidVersions.forEach((version) => {
      expect(() => {
        client.clientVersion = version;
      }).toThrow(
        "Invalid `Client-Version` format. Expected format is 'prefix-x.x.x' where prefix is a lowercase string."
      );
    });
  });

  test('should get the correct client version', () => {
    const version = 'js-1.0.0';
    client.clientVersion = version;
    expect(client.clientVersion).toBe(version);
  });
});
