import { BaseDocument } from './baseTypes';

// Tipos para Mascota (basados en el schema de Mongoose)
export type TipoMascota = 'perro' | 'gato' | 'conejo';

// Interfaz para el documento de Mongoose (incluye null para campos opcionales)
export interface IMascotaDocument extends BaseDocument {
  nombre: string;
  tipo: TipoMascota;
  raza?: string | null;
  edad?: number | null;
  descripcion?: string | null;
  adoptado?: boolean;
}

// DTO para crear una mascota (sin campos generados automáticamente)
export interface CrearMascotaDTO {
  nombre: string;
  tipo: TipoMascota;
  raza?: string;
  edad?: number;
  descripcion?: string;
  adoptado?: boolean;
}

// DTO para actualizar una mascota (todos los campos opcionales excepto los del sistema)
export interface ActualizarMascotaDTO {
  nombre?: string;
  tipo?: TipoMascota;
  raza?: string;
  edad?: number;
  descripcion?: string;
  adoptado?: boolean;
}