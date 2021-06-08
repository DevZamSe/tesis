import { permission } from '../interfaces/authLogin';

export const superadmin: Array<permission> = [
  { id: 0, name: 'Inicio' },
  { id: 1, name: 'Usuario' },
  { id: 2, name: 'Clientes' },
  { id: 3, name: 'Ventas' },
  { id: 4, name: 'Prediccion' },
  { id: 5, name: 'Reportes' },
  { id: 6, name: 'Orden de compra' },
  { id: 7, name: 'Inventario' },
];

export const admin: Array<permission> = [
  { id: 0, name: 'Inicio' },
  { id: 1, name: 'Usuario' },
  { id: 2, name: 'Clientes' },
  { id: 3, name: 'Ventas' },
  { id: 4, name: 'Prediccion' },
];

export const client: Array<permission> = [
  { id: 5, name: 'Reportes' },
  { id: 6, name: 'Orden de compra' },
  { id: 7, name: 'Inventario' },
];
