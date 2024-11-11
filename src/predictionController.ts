import { PredictionRequest, PredictionResult } from "./predictionTypes";
import { predictFirst, predictSecond, predictThird } from "./predictionUtils";

let lastPrediction: PredictionResult | null = null;

export async function predict(inputData: PredictionRequest): Promise<PredictionResult> {
  const mode = inputData.params.find(p => p.name==='mode');
  if (!mode) {
    throw new Error('mode is not defined');
  }
  if (mode.value === 0) {
    lastPrediction = await predictFirst(inputData);
  } else if (mode.value === 1) {
    lastPrediction = await predictSecond(inputData);
  }else if (mode.value === 2) {
    lastPrediction = await predictThird(inputData);
  } else {
    throw new Error('Invalid mode selected');
  }
  return lastPrediction;
}

export function getLastPrediction(): PredictionResult | null {
  return lastPrediction;
}
