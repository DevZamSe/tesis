export interface PredictionList {
  ANO: number;
  ID_RESULTADO_MODELO: number;
  MES: number;
  NOMBRE: string;
  PRECISION_MODELO: number;
  PREDICCION: number;
}

export interface PredictionDelete {
  predictionid: number;
}
