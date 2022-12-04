'use strict';

const converter =  require('../lib/index.js');
const converterModule =  require('../lib/index.es6.js');

const fixture = {
  dates: {
    European: new Date('09 Apr 2020 07:00:00'),
    Ethiopian: ['Meyazya 1, 2012', '07:00:00 a.m.'],
  },
};

describe('main', () => {
  it('js exports expected module structure', () => {
    expect(converter).toHaveProperty(
      'ethDateTime',
      'limits',
      'converterDateTime',
      'converterString',
    );
  });
  it('module exports expected module structure', () => {
    expect(converterModule).toHaveProperty(
      'ethDateTime',
      'limits',
      'converterDateTime',
      'converterString',
    );
  });
  it('converts European date to Ethiopian', () => {
    expect(converter.converterString.dateTime.toEthiopian(fixture.dates.European)).toStrictEqual(fixture.dates.Ethiopian);
    expect(converterModule.converterString.dateTime.toEthiopian(fixture.dates.European)).toStrictEqual(fixture.dates.Ethiopian);
  });
});
