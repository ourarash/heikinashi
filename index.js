//Converting statndard candlestick data to Heikin Ashi
//Written by Ari Saif (ourarash@gmail.com)
/**
 * Converts statndard candlestick data to Heikin Ashi
 * ohlc: input data that has open, high, low, and close
 * Options: {
    overWrite: overwrites the original data
   }
*/
module.exports = function(ohlc, options = { overWrite: false }) {
  return HeikinAshi(ohlc, options);
};

// HA-Close = (Open(0) + High(0) + Low(0) + Close(0)) / 4
// HA-Open = (HA-Open(-1) + HA-Close(-1)) / 2
// HA-High = MAX (High(0), HA-Open(0) or HA-Close(0))
// HA-Low = Min (Low(0), HA-Open(0) or HA-Close(0) )
function HeikinAshi(ohlc, options = { overWrite: false }) {
  if (!ohlc || ohlc.length === 0) {
    return [];
  }

  let result = [];
  for (let i = 0; i < ohlc.length; i++) {
    const element = ohlc[i];

    let haCandle;
    if (options.overWrite) {
      haCandle = element;
    } else {
      haCandle = JSON.parse(JSON.stringify(element));
    }
    haCandle.close = (element.open + element.high + element.low + element.close) / 4;

    if (i > 0) {
      const element_1 = ohlc[i - 1];
      const result_1 = result[i - 1];
      haCandle.open = (result_1.open + result_1.close) / 2;
      haCandle.high = Math.max(element.high, haCandle.open, haCandle.close);
      haCandle.low = Math.min(element.low, haCandle.open, haCandle.close);
    }
    result.push(haCandle);
  }
  return result;
}
