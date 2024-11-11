export type WeekData = { timestamp: string; value: number };

export type PredictionRequest = {
  params: { name: string; value: number }[];
  data: WeekData[];
};

export type PredictionResult = {
  predictions: WeekData[];
};
