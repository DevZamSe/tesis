export interface SalesList {
    CANTIDAD: number,
    FECHA: string,
    ID_CLIENTE: number,
    ID_PRODUCTO: number,
    ID_VENTA: number,
    MONTO: number
  }
  
  export interface SaleDelete {
    predictionid: number;
  }
  export interface SaleAdd{
    clientid:number,
    productid:number,
    cantidad: number
  }