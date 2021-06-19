export interface ListPurchase {
    response: Array<ResponsePurchase>;
  }
  
  export interface ResponsePurchase{
    
    PROVEEDOR: string,
    MENSAJE: string,
    ID_ORDEN_COMPRA: number,
    ID_PRODUCTO: number,
    ID_RESULTADO_MODELO: number,
    FECHA: string,
  }
  