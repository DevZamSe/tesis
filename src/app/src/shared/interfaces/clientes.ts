export interface ListClient {
    response: Array<ResponseClient>;
  }
  
  export interface ResponseClient {
    NOMBRE: string,
    APELLIDO: string,
    TIPO_DOCUMENTO: number,
    NUM_DOCUMENTO: string,
    SEXO:string,
    DIRECCION: string,
    DISTRITO: string,
    TELEFONO: string,
    EDAD: number,
    EMAIL: string,
    ID_CLIENTE:number,
  }
  