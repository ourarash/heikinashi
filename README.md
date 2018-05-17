# Heikinashi

Converts OHLC Candlstick data to Heikin-Ashi

The conversion is done based on this:

```javascript
HA.Close = (Open(0) + High(0) + Low(0) + Close(0)) / 4;
HA.Open = (HA.Open(-1) + HA.Close(-1)) / 2;
HA.High = MAX(High(0), HA.Open(0), HA.Close(0));
HA.Low = Min(Low(0), HA - Open(0), HA.Close(0));

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
  overWrite: false  //overwrite the original data or create a new array
});

console.log("result: ", JSON.stringify(result, null, 2));
```

## Examples:

This package is used to implement TD Sequential indicator in Bitcoin CrazYness app:

[BitcoinCrazYness.com](bitcoincrazyness.com)

Below is an example screenshot.
<div style="text-align:center">

| Standard| Heikin Ashi |
| ------------- |-------------|
| <img src="https://raw.githubusercontent.com/ourarash/heikinashi/master/screenshots/standard.jpg" width="200"> | <img src="https://raw.githubusercontent.com/ourarash/heikinashi/master/screenshots/heikinashi.jpg" width="200"> |

</div>

## License

[MIT](http://vjpr.mit-license.org)
