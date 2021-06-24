import { permission } from '../interfaces/authLogin';

export const superadmin: Array<permission> = [
  { id: 1, name: 'Usuario' },
  { id: 2, name: 'Clientes' },
  { id: 3, name: 'Ventas' },
  { id: 4, name: 'Predicción' },
  { id: 5, name: 'Reportes' },
  { id: 6, name: 'Orden de compra' },
  { id: 7, name: 'Producto' },
  { id: 8, name: 'Cerrar Sesión' },
];

export const admin: Array<permission> = [
  { id: 1, name: 'Usuario' },
  { id: 2, name: 'Clientes' },
  { id: 3, name: 'Ventas' },
  { id: 4, name: 'Predicción' },
  { id: 8, name: 'Cerrar Sesión' },
];

export const client: Array<permission> = [
  { id: 6, name: 'Orden de compra' },
  { id: 7, name: 'Producto' },
  { id: 8, name: 'Cerrar Sesión' },
];
