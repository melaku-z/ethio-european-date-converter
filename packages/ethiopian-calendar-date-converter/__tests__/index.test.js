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
      'minEurDate',
      'maxEurDate',
      'minEthYear',
      'maxEthYear',
      'ethTime',
      'toEthiopianDateTime',
      'toEthiopianDateString',
      'toEthiopianTimeString',
      'toEthiopianDateTimeString',
      'toEuropeanDate',
      'toEuropeanDateString',
    );
  });
  it('module exports expected module structure', () => {
    expect(converterModule).toHaveProperty(
      'minEurDate',
      'maxEurDate',
      'minEthYear',
      'maxEthYear',
      'ethTime',
      'toEthiopianDateTime',
      'toEthiopianDateString',
      'toEthiopianTimeString',
      'toEthiopianDateTimeString',
      'toEuropeanDate',
      'toEuropeanDateString',
    );
  });
  it('converts European date to Ethiopian', () => {
    expect(converter.toEthiopianDateTimeString(fixture.dates.European)).toStrictEqual(fixture.dates.Ethiopian);
  });
});
