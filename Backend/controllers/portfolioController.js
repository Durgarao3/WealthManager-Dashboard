const {
  data,
  normalizeHoldings,
  computeHoldingsMetrics,
  computeAllocation,
  computeReturnsFromTimeline,
  diversificationScore,
  riskLevelFromTimeline
} = require('../utils/calc');

// GET /api/portfolio/holdings
exports.getHoldings = (req, res) => {
  try {
    const raw = normalizeHoldings(data);
    const holdings = computeHoldingsMetrics(raw);
    res.json(holdings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching holdings' });
  }
};

// GET /api/portfolio/allocation
exports.getAllocation = (req, res) => {
  try {
    const raw = normalizeHoldings(data);
    const holdings = computeHoldingsMetrics(raw);
    const allocation = computeAllocation(holdings);
    res.json(allocation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching allocation' });
  }
};

// GET /api/portfolio/performance
exports.getPerformance = (req, res) => {
  try {
    const perf = computeReturnsFromTimeline(data.performanceTimeline || []);
    res.json(perf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching performance' });
  }
};

// GET /api/portfolio/summary
exports.getSummary = (req, res) => {
  try {
    const raw = normalizeHoldings(data);
    const holdings = computeHoldingsMetrics(raw);

    const totalValue = holdings.reduce((s, h) => s + h.value, 0);
    const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
    const totalGainLoss = totalValue - totalInvested;
    const totalGainLossPercent = totalInvested ? (totalGainLoss / totalInvested) * 100 : 0;

    const sorted = holdings.slice().sort((a, b) => b.gainLossPercent - a.gainLossPercent);
    const topPerformer = sorted[0];
    const worstPerformer = sorted[sorted.length - 1];

    res.json({
      totalValue: +totalValue.toFixed(2),
      totalInvested: +totalInvested.toFixed(2),
      totalGainLoss: +totalGainLoss.toFixed(2),
      totalGainLossPercent: +totalGainLossPercent.toFixed(2),
      topPerformer: topPerformer
        ? { symbol: topPerformer.symbol, name: topPerformer.name, gainPercent: topPerformer.gainLossPercent }
        : null,
      worstPerformer: worstPerformer
        ? { symbol: worstPerformer.symbol, name: worstPerformer.name, gainPercent: worstPerformer.gainLossPercent }
        : null,
      diversificationScore: diversificationScore(holdings),
      riskLevel: riskLevelFromTimeline(data.performanceTimeline || [])
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching summary' });
  }
};
