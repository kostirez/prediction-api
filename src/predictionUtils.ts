import { PredictionRequest, PredictionResult, WeekData } from "./predictionTypes";

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

export function predictSecond(inputData: PredictionRequest): PredictionResult {
  const predictions: PredictionResult = {
    predictions: []
  }
  return predictions;
}

export function predictThird(inputData: PredictionRequest): PredictionResult {
  const predictions: PredictionResult = {
    predictions: []
  }
  return predictions;
}
