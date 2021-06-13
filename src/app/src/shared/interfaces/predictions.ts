export interface Prediction {
  nombre: string;
  mes: number;
  ano: number;
  prediccion: number;
  precision: number;
}

export interface PredictionDelete {
  predictionid: number;
}
