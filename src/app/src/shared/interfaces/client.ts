export interface ListClient {
  response: Array<ResponseClient>;
}

export interface ResponseClient {
  APELLIDO: string;
  FECHA_CREACION: string;
  ID_ROL: number;
  ID_USUARIO: number;
  NOMBRE: string;
  USERNAME: string;
}
