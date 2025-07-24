import { BaseDocument } from './baseTypes';

export interface IUsuarioDocument extends BaseDocument {
  nombre: string;
  email: string;
  clave: string;
  telefono?: string | null;
}

export interface CrearUsuarioDTO {
  nombre: string;
  email: string;
  clave: string;
  telefono?: string | null;
}

export interface ActualizarUsuarioDTO {
  nombre?: string;
  email?: string;
  clave?: string;
  telefono?: string | null;
}

export interface LoginDTO {
  email: string;
  clave: string;
}