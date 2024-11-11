# Forecasting REST API

This is a simple REST API provides sales forecast predictions based on historical data. The API has two endpoints:
- `POST /predict` for generating a 10-week sales forecast based on input data.
- `GET /prediction` to retrieve the latest forecast calculation.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

Install dependencies and run the program with the following commands:

```bash
# Install dependencies
npm install
# Run the program
npx ts-node src/index.ts
```
### 1. POST `/predict`
Generates a forecast based on provided historical data and parameters.

- **Endpoint**: `/predict`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
    - `params`: Array of objects with prediction parameters.
      - `mode`: Number — Defines which calculation function to use.
          - `mode=0`: Moving Average
          - `mode=1`: Linear Regression
      - `windowSize`: Number — Used only if `mode=0` (Moving Average); defaults to `5` if not provided.
    - `data`: Array of historical data points.
        - `timestamp`: String (ISO date format)
        - `value`: Number (sales or demand figure)

#### Example Request for moving average

```json
{
  "params": [
    {"name": "mode", "value": 0},
    {"name": "windowSize", "value": 3}
  ],
  "data": [
    {"timestamp": "2019-03-18T00:00:00.000Z", "value": 2067},
    {"timestamp": "2019-03-25T00:00:00.000Z", "value": 2283},
    {"timestamp": "2019-04-01T00:00:00.000Z", "value": 1929}
  ]
}
```
#### Example Response

```json
{
  "predictions":[
    {"timestamp":"2019-04-08T00:00:00.000Z","value":2093},
    {"timestamp":"2019-04-15T00:00:00.000Z","value":2101.6666666666665},
    {"timestamp":"2019-04-22T00:00:00.000Z","value":2041.222222222222},
    {"timestamp":"2019-04-29T00:00:00.000Z","value":2078.629629629629},
    {"timestamp":"2019-05-06T00:00:00.000Z","value":2073.8395061728393},
    {"timestamp":"2019-05-13T00:00:00.000Z","value":2064.56378600823},
    {"timestamp":"2019-05-20T00:00:00.000Z","value":2072.3443072702325},
    {"timestamp":"2019-05-27T00:00:00.000Z","value":2070.249199817101},
    {"timestamp":"2019-06-03T00:00:00.000Z","value":2069.0524310318547},
    {"timestamp":"2019-06-10T00:00:00.000Z","value":2070.548646039729}
  ]
}
```


## 1. GET `/prediction`
Generates a forecast based on provided historical data and parameters.

- **Endpoint**: `/prediction`
- **Method**: `GET`
- **Content-Type**: `application/json`

#### Example Response

```json
{
  "predictions":[
    {"timestamp":"2019-04-08T00:00:00.000Z","value":2093},
    {"timestamp":"2019-04-15T00:00:00.000Z","value":2101.6666666666665},
    {"timestamp":"2019-04-22T00:00:00.000Z","value":2041.222222222222},
    {"timestamp":"2019-04-29T00:00:00.000Z","value":2078.629629629629},
    {"timestamp":"2019-05-06T00:00:00.000Z","value":2073.8395061728393},
    {"timestamp":"2019-05-13T00:00:00.000Z","value":2064.56378600823},
    {"timestamp":"2019-05-20T00:00:00.000Z","value":2072.3443072702325},
    {"timestamp":"2019-05-27T00:00:00.000Z","value":2070.249199817101},
    {"timestamp":"2019-06-03T00:00:00.000Z","value":2069.0524310318547},
    {"timestamp":"2019-06-10T00:00:00.000Z","value":2070.548646039729}
  ]
}
```
