
import appT from '../src/app';

require('iconv-lite').encodingExists('cesu8');


describe('app module', () => {
  test('it exists', async () => {
    expect(appT).toBeDefined();
  });

  /**
  * @jest-environment jsdom
  */
  test('it returns program name with SDGs', async () => {
    const result = await appT();
    const sdgPos = (result || '').indexOf('SDG');
    expect(sdgPos).toBeGreaterThanOrEqual(0);
  });
});
