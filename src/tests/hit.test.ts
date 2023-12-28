import { Hit } from '../hit';

describe('Hit', () => {
  let hit: Hit;
  const mockedPlatform = 'web';
  const mockedUrl = '/hit';

  beforeEach(() => {
    hit = new Hit({ platform: mockedPlatform, url: mockedUrl });
    global.console.error = jest.fn();
  });

  describe('initialized Hit', () => {
    it('should set the url property', () => {
      expect(hit.url).toBe(mockedUrl);
    });

    it('should set the platform property', () => {
      expect(hit.platform).toBe(mockedPlatform);
    });
  });

  describe('after initialized Hit', () => {
    const mockedType = 'load';
    const mockedRequestBody = {
      type: mockedType,
      meta: {
        platform: mockedPlatform,
      },
    };

    beforeEach(() => {
      jest.clearAllMocks();
      
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ ok: true }),
      });
    });

    it('should send a POST request with the correct body to the specified URL', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch');

      await hit.request({ type: mockedType });

      expect(fetchSpy).toHaveBeenCalledWith(mockedUrl, {
        method: 'POST',
        body: JSON.stringify(mockedRequestBody),
      });
    });

    it('should return the response object if the request is successful', async () => {
      const response = await hit.request({ type: mockedType });

      expect(response.ok).toBe(true);
    });

    it('should throw an error if the request is not successful', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue({ ok: false }),
      });

      await hit.request({ type: mockedType });

      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should log an error when an exception occurs during the request', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      global.fetch = jest.fn().mockRejectedValueOnce(new Error());

      await hit.request({ type: mockedType });

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
