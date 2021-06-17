export interface ListClient {
    response: Array<ResponseClient>;
  }
  
  export interface ResponseClient {
    nombre: string,
    apellido: string,
    tipoDocumento: number,
    numDocumento: string,
    sexo:string,
    direcion: string,
    distrito: string,
    telefono: string,
    edad: number,
    email: string,
    id_cliente:number,
  }
  