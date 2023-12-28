import { AvitoPixel } from '../index';

describe('AvitoPixel instance', () => {
  let avitoPixel: AvitoPixel;
  const mockedUrl = 'https://www.example.com';
  const mockedPaths = {
    hit: '/hit',
  };

  beforeEach(() => {

    jest.clearAllMocks();
    global.console.error = jest.fn();

    avitoPixel = new AvitoPixel({
      host: mockedUrl,
      platform: 'web',
      paths: mockedPaths,
    });
  });

  describe('initialized AvitoPixel', () => {
    it('should set the hit property', () => {
      expect(avitoPixel.hit).toBeDefined();
    });

    it('should return the existing instance if it already exists', () => {
      const newInstance = new AvitoPixel({ host: '', platform: 'web', paths: { hit: "/hit" } });

      expect(newInstance).toBe(avitoPixel);
    });
  });

  describe('after initialized AvitoPixel', () => {
    it('should send a load request to the hit endpoint', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue({ ok: false }),
      });
      
      const requestSpy = jest.spyOn(avitoPixel.hit, 'request');

      await avitoPixel.init();

      expect(requestSpy).toHaveBeenCalledWith({ type: 'load' });
    });
  });
});

