const fs = require('fs');
const path = require('path');

// Load data from portfolio.json
const raw = fs.readFileSync(path.join(__dirname, '..', 'data', 'portfolio.json'), 'utf8');
const data = JSON.parse(raw);

function normalizeHoldings(rawData) {
  return rawData.map(item => ({
    symbol: item["Symbol"],
    name: item["Company Name"],
    quantity: item["Quantity"],
    avgPrice: item["Avg Price ₹"],
    currentPrice: item["Current Price (₹)"],
    sector: item["Sector"],
    marketCap: item["Market Cap"]
  }));
}

function safeNumber(x) {
  return Number(x) || 0;
}

function computeHoldingsMetrics(holdings) {
  return holdings.map(h => {
    const quantity = safeNumber(h.quantity);
    const avg = safeNumber(h.avgPrice);
    const current = safeNumber(h.currentPrice);

    const value = +(quantity * current).toFixed(2);
    const invested = +(quantity * avg).toFixed(2);
    const gainLoss = +(value - invested).toFixed(2);
    const gainLossPercent = invested === 0 ? 0 : +((gainLoss / invested) * 100).toFixed(2);

    return { ...h, value, invested, gainLoss, gainLossPercent };
  });
}

function computeAllocation(holdings) {
  const total = holdings.reduce((s, h) => s + (h.value || 0), 0);
  const bySector = {};
  const byMarketCap = {};

  holdings.forEach(h => {
    const sec = h.sector || 'Unknown';
    const mcap = h.marketCap || 'Unknown';
    bySector[sec] = (bySector[sec] || 0) + (h.value || 0);
    byMarketCap[mcap] = (byMarketCap[mcap] || 0) + (h.value || 0);
  });

  const format = obj => {
    const out = {};
    for (const k in obj) {
      const value = +obj[k].toFixed(2);
      const percentage = total === 0 ? 0 : +((obj[k] / total) * 100).toFixed(1);
      out[k] = { value, percentage };
    }
    return out;
  };

  return { bySector: format(bySector), byMarketCap: format(byMarketCap) };
}

function findNearestIndex(timeline, targetDate) {
  const arr = timeline.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  let idx = -1;
  for (let i = 0; i < arr.length; i++) {
    const d = new Date(arr[i].date).getTime();
    if (d <= targetDate.getTime()) idx = i;
    else break;
  }
  return idx === -1 ? 0 : idx;
}

function computeReturnsFromTimeline(timeline) {
  if (!Array.isArray(timeline) || timeline.length < 2) {
    return { timeline, returns: { portfolio: {}, nifty50: {}, gold: {} } };
  }

  const arr = timeline.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const last = arr[arr.length - 1];
  const lastDate = new Date(last.date);

  const periods = {
    "1month": new Date(lastDate.getFullYear(), lastDate.getMonth() - 1, lastDate.getDate()),
    "3months": new Date(lastDate.getFullYear(), lastDate.getMonth() - 3, lastDate.getDate()),
    "1year": new Date(lastDate.getFullYear() - 1, lastDate.getMonth(), lastDate.getDate())
  };

  const returns = { portfolio: {}, nifty50: {}, gold: {} };

  for (const key in periods) {
    const idx = findNearestIndex(arr, periods[key]);
    const start = arr[idx];

    ['portfolio', 'nifty50', 'gold'].forEach(series => {
      const startVal = start[series];
      const endVal = last[series];
      returns[series][key] = !startVal ? 0 : +(((endVal - startVal) / startVal) * 100).toFixed(2);
    });
  }

  return { timeline: arr, returns };
}

function diversificationScore(holdings) {
  const total = holdings.reduce((s, h) => s + (h.value || 0), 0);
  const bySector = {};
  holdings.forEach(h => {
    bySector[h.sector || 'Unknown'] = (bySector[h.sector || 'Unknown'] || 0) + (h.value || 0);
  });

  const ps = Object.values(bySector).map(v => v / (total || 1)).filter(x => x > 0);
  const entropy = -ps.reduce((s, p) => s + p * Math.log2(p), 0);
  const maxEntropy = Math.log2(Math.max(Object.keys(bySector).length, 1));
  const norm = maxEntropy === 0 ? 0 : entropy / maxEntropy;
  return +(norm * 10).toFixed(1);
}

function riskLevelFromTimeline(timeline) {
  if (!timeline || timeline.length < 2) return 'Moderate';

  const arr = timeline.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const pctChanges = [];

  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1].portfolio;
    const cur = arr[i].portfolio;
    if (prev) pctChanges.push((cur - prev) / prev * 100);
  }

  const mean = pctChanges.reduce((s, x) => s + x, 0) / pctChanges.length;
  const variance = pctChanges.reduce((s, x) => s + Math.pow(x - mean, 2), 0) / pctChanges.length;
  const sd = Math.sqrt(variance);

  if (sd < 2) return 'Low';
  if (sd < 6) return 'Moderate';
  return 'High';
}

module.exports = {
  data,
  normalizeHoldings,
  computeHoldingsMetrics,
  computeAllocation,
  computeReturnsFromTimeline,
  diversificationScore,
  riskLevelFromTimeline
};

