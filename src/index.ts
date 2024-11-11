import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { predict, getLastPrediction } from './predictionController';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST /predict
app.post('/predict', async (req: Request, res: Response) => {
  try {
    const prediction = await predict(req.body);
    res.json(prediction);
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ error: message });
  }
});

// GET /prediction
app.get('/prediction', (req: Request, res: Response) => {
  const lastPrediction = getLastPrediction();
  if (lastPrediction) {
    res.json(lastPrediction);
  } else {
    res.status(404).json({ error: "No prediction found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
