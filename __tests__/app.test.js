// eslint-disable-next-line no-unused-vars
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

// eslint-disable-next-line no-unused-vars
import RoadRescueApp from '../src/RoadRescueApp';

require('iconv-lite').encodingExists('cesu8');

configure({ adapter: new Adapter() });
describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<RoadRescueApp />);
  });
});


/* describe('app module', () => {
  test('it exists', async () => {
    expect(appT).toBeDefined();
  });

  /**
  * @jest-environment jsdom
  *
  test('it returns program name with SDGs', async () => {
    const result = await appT();
    const sdgPos = (result || '').indexOf('SDG');
    expect(sdgPos).toBeGreaterThanOrEqual(0);
  });
});* */
