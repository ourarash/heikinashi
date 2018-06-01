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
function HeikinAshi(
  ohlc,
  options = {
    overWrite: false,
    formatNumbers: false,
    decimals: 4,
    forceExactDecimals: false
  }
) {
  let overWrite = options.overWrite || false;
  let formatNumbers = options.formatNumbers || false;
  let decimals = options.decimals || 4;
  let forceExactDecimals = options.forceExactDecimals || false;

  if (!ohlc || ohlc.length === 0) {
    return [];
  }

  let result = [];
  for (let i = 0; i < ohlc.length; i++) {
    const element = ohlc[i];

    let haCandle;
    if (overWrite) {
      haCandle = element;
    } else {
      haCandle = JSON.parse(JSON.stringify(element));
    }
    haCandle.close = (element.open + element.high + element.low + element.close) / 4;
    if(formatNumbers){
      haCandle.close = formatNumbersFunc(haCandle.close, decimals, forceExactDecimals);
    }

    if (i > 0) {
      const element_1 = ohlc[i - 1];
      const result_1 = result[i - 1];
      haCandle.open = (result_1.open + result_1.close) / 2;
      if(formatNumbers){
        haCandle.open = formatNumbersFunc(haCandle.open, decimals, forceExactDecimals);
      }
      haCandle.high = Math.max(element.high, haCandle.open, haCandle.close);
      haCandle.low = Math.min(element.low, haCandle.open, haCandle.close);
    }
    result.push(haCandle);
  }
  return result;
}

// Sets the number of significant digits based on the number's value and its parameters.
// If forceExactDecimals is false, the bigger the value, the lower the number of significant digits
function formatNumbersFunc(value, decimals = 4, forceExactDecimals = false) {
  let maxDecimals = 8;
  try {
    if (!value) {
      return value;
    }

    if (!isNaN(value)) {
      value = parseFloat(value);
    }
    if (forceExactDecimals) {
      return parseFloat(value.toFixed(decimals));
    }

    if (value < 1) {
      return parseFloat(value.toFixed(maxDecimals));
    } else if (value > 1000) {
      decimals = 0;
    } else if (value > 100) {
      decimals = 2;
    }

    return parseFloat(value.toFixed(decimals));
  } catch (error) {
    console.log("value: ", JSON.stringify(value));
    console.log("FixNumberPipe Error: ", error);
  }
}
