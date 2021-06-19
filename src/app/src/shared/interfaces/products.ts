export interface ListProduct {
    response: Array<ResponseProduct>;
  }
  
  export interface ResponseProduct{
    ID_PRODUCTO: number,
    NOMBRE_PRODUCTO: string,
    PRECIO: number,
    STOCK: number,
   
  }
  