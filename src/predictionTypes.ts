
export type PredictionRequest = {
  params: { name: string; value: number }[];
  data: { timestamp: string; value: number }[];
};

export type PredictionResult = {
  predictions: { timestamp: string; value: number }[];
};
