import { PredictionRequest, PredictionResult } from "./predictionTypes";
import { calculateLinearRegression, calculateMovingAverage, predictThird } from "./predictionUtils";

let lastPrediction: PredictionResult | null = null;

export function predict(inputData: PredictionRequest): PredictionResult {
  const mode = inputData.params.find(p => p.name==='mode');
  if (!mode) {
    throw new Error('mode is not defined');
  }
  if (mode.value === 0) {
    //moving average
    lastPrediction = getMovingAverage(inputData);
  } else if (mode.value === 1) {
    //linear regression
    lastPrediction = getLinearRegression(inputData);
  }else if (mode.value === 2) {
    lastPrediction = predictThird(inputData);
  } else {
    throw new Error('Invalid mode selected');
  }
  return lastPrediction;
}

export function getLastPrediction(): PredictionResult | null {
  return lastPrediction;
}

function getMovingAverage(inputData: PredictionRequest): PredictionResult {
  const { data } = inputData;
  const windowSize = inputData.params.find(p => p.name==='windowSize')?.value ?? 5;
  if (!Number.isInteger(windowSize)) {
    throw new Error('windowSize has to be integer');
  }
  return calculateMovingAverage(data, windowSize);
}

function getLinearRegression(inputData: PredictionRequest): PredictionResult {
  const { data } = inputData;
  return calculateLinearRegression(data);
}
