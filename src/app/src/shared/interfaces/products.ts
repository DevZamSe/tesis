export interface ListProduct {
    response: Array<ResponseProduct>;
  }
  export interface SelectProduct {
    response: Array<Product>;
  }
  
  export interface ResponseProduct{
    ID_PRODUCTO: number,
    NOMBRE_PRODUCTO: string,
    PRECIO: number,
    STOCK: number,
   
  }
  export interface Product{
    ID_PRODUCTO:number,
    NOMBRE_PRODUCTO:string
  }