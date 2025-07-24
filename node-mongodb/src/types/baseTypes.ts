import { Request, Response } from 'express';
import { ObjectId, Document } from 'mongodb';
import { Types } from 'mongoose';

// Tipos base para MongoDB
export interface BaseDocument extends Document {
  _id?: ObjectId | Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipos para Express con parámetros tipados
export interface TypedRequest<T = any> extends Request {
  body: T;
  emailConectado?: string;
}

export interface TypedResponse<T = any> extends Response {
  json: (body: T) => this;
}

// Tipos para controladores
export type ControllerFunction<T = any, R = any> = (
  req: TypedRequest<T>,
  res: TypedResponse<R>
) => Promise<void> | void;
