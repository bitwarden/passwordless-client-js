import { Client, Config } from './passwordless';

describe('Client', (): void => {
  describe('clientVersion', (): void => {
    let client: Client;

    beforeEach((): void => {
      let options: Config = {
        apiUrl: 'http://localhost:8080',
        apiKey: 'public:app1:123',
        origin: 'https://pwdemo',
        rpid: 'pwdemo'
      };
      client = new Client(options);
    });

    test('gets expected original client version format', (): void => {
      const originalVersion: string = client.clientVersion;

      expect(client.clientVersionRegex.test(originalVersion)).toBe(true);
    });

    test('should set valid client version format', (): void => {
      const version: string = 'android-5.4.3';

      const originalVersion: string = client.clientVersion;
      client.clientVersion = version;
      expect(client.clientVersion).toBe(`${version}+${originalVersion}`);
    });

    test('should not set invalid client version format', (): void => {
      const version: string = 'android--5.4.3';
      expect(() => (client.clientVersion = version)).toThrow(
        "Invalid `Client-Version` format. Expected format is 'prefix-x.x.x' where prefix is a lowercase string."
      );
    });

    test('should not set valid client version twice', (): void => {
      const version1: string = 'android-5.4.3';
      const version2: string = 'blazor-5.4.3';
      client.clientVersion = version1;
      expect(() => (client.clientVersion = version2)).toThrow(
        '`Client-Version` has already been set.'
      );
    });
  });
});
