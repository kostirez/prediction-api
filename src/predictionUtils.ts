import { PredictionResult, WeekData } from "./predictionTypes";

function nextWeek(timestamp: string): string {
  const nextTimestamp = new Date(timestamp);
  nextTimestamp.setDate(nextTimestamp.getDate() + 7);
  return nextTimestamp.toISOString();
}

export function calculateMovingAverage(data: WeekData[], windowSize: number): PredictionResult {
  const result: PredictionResult = {
    predictions: []
  }
  let lastValues: WeekData[] = [];
  for (let i = 0; i < 10; i++) {
    lastValues = data.concat(lastValues).slice(-windowSize);
    const average = lastValues.reduce((sum, prediction) => sum + prediction.value, 0) / windowSize;
    const timestamp = nextWeek(lastValues[lastValues.length - 1].timestamp);
    const lastValue = {timestamp, value: average}
    result.predictions.push(lastValue);
    lastValues.push(lastValue);
  }
  return result;
}

export function calculateLinearRegression(data: WeekData[]): PredictionResult {
  const result: PredictionResult = {
    predictions: []
  }

  const n = data.length;
  // weeks
  const x = data.map((_, i) => i+1);
  // values
  const y = data.map(d => d.value);

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  // coefficient  b1
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

  // constant b0
  const intercept = (sumY - slope * sumX) / n;


  let lastWeek = data[data.length - 1].timestamp;

  for (let i = 1; i <= 10; i++) {
    const nextX = n + i;
    // y = b1*x + b0
    const nextValue = slope * nextX + intercept;
    lastWeek = nextWeek(lastWeek);
    result.predictions.push({timestamp: lastWeek, value: nextValue})
  }

  return result;
}
