# Heikinashi

[![NPM](https://badge.fury.io/js/heikinashi.svg)](https://www.npmjs.com/package/heikinashi)
[![NPM Downloads][downloadst-image]][downloads-url]

[downloads-image]: https://img.shields.io/npm/dm/heikinashi.svg
[downloadst-image]: https://img.shields.io/npm/dt/heikinashi.svg
[downloads-url]: https://npmjs.org/package/heikinashi


Converts OHLC Candlestick data to Heikin-Ashi

The conversion is done based on this:

```javascript
HA.Close = (Open(0) + High(0) + Low(0) + Close(0)) / 4;
HA.Open = (HA.Open(-1) + HA.Close(-1)) / 2;
HA.High = MAX(High(0), HA.Open(0), HA.Close(0));
HA.Low = Min(Low(0), HA.Open(0), HA.Close(0));

// Where (0) means current candle, and (-1) means the previous candle
```

The output is an array of the same size

```javascript
let result = [{
  open: 100,
  high: 200,
  low: 10,
  close: 50,
}, ...
]
```

## Install

```bash
npm i -S heikinashi
```

## Usage

```javascript
var HeikinAshi = require("heikinashi");

let result = HeikinAshi([
  {
    time: 1525651200,
    close: 9377.81,
    high: 9662.23,
    low: 9202.13,
    open: 9643.99,
    volume: 73842.44,
  },
  ...
],
options{
  overWrite: false,  //overwrites the original data or create a new array
  formatNumbers: false, //formats the numbers and reduces their significant digits based on the values
  decimals: 4,  //number of significant digits
  forceExactDecimals: false //force the number of significant digits or reduce them if the number is high
});

console.log("result: ", JSON.stringify(result, null, 2));
```

## Examples:

This package is used to implement TD Sequential indicator in Bitcoin CrazYness app:

[BitcoinCrazYness.com](http://bitcoincrazyness.com)

Below is an example screenshot.
<center>

| Standard| Heikin Ashi |
| ------------- |-------------|
| <img src="https://raw.githubusercontent.com/ourarash/heikinashi/master/screenshots/standard.jpg" width="250"> | <img src="https://raw.githubusercontent.com/ourarash/heikinashi/master/screenshots/heikinashi.jpg" width="250"> |

</center>

## License

[MIT](http://vjpr.mit-license.org)
