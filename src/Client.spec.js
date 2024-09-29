import { Client } from './passwordless';
describe('Client', () => {
  describe('clientVersion', () => {
    let client;
    beforeEach(() => {
      let options = {
        apiUrl: 'http://localhost:8080',
        apiKey: 'public:app1:123',
        origin: 'https://pwdemo',
        rpid: 'pwdemo'
      };
      client = new Client(options);
    });
    test('gets expected original client version format', () => {
      const originalVersion = client.clientVersion;
      expect(client.clientVersionRegex.test(originalVersion)).toBe(true);
    });
    test('should set valid client version format', () => {
      const version = 'android-5.4.3';
      const originalVersion = client.clientVersion;
      client.clientVersion = version;
      expect(client.clientVersion).toBe(`${version}+${originalVersion}`);
    });
    test('should not set invalid client version format', () => {
      const version = 'android--5.4.3';
      expect(() => (client.clientVersion = version)).toThrow(
        "Invalid `Client-Version` format. Expected format is 'prefix-x.x.x' where prefix is a lowercase string."
      );
    });
    test('should not set valid client version twice', () => {
      const version1 = 'android-5.4.3';
      const version2 = 'blazor-5.4.3';
      client.clientVersion = version1;
      expect(() => (client.clientVersion = version2)).toThrow(
        '`Client-Version` has already been set.'
      );
    });
  });
});
