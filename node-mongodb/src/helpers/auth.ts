import { TypedRequest, TypedResponse } from '@/types/baseTypes';
import 'dotenv/config';
import jsonwebtoken, { SignOptions, JwtPayload } from "jsonwebtoken";
import { NextFunction } from 'express';

export function generarToken(email: string): string {
  const secret: string | undefined = process.env.JWT_TOKEN_SECRET;

  if (!secret) {
    throw new Error('JWT_TOKEN_SECRET no está definido en las variables de entorno');
  }

  const payload: any = { email };
  const options: SignOptions = { expiresIn: '1h' };

  return jsonwebtoken.sign(payload, secret, options);
}

export function verificarToken(req: TypedRequest, res: TypedResponse, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token: string = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const secret: string | undefined = process.env.JWT_TOKEN_SECRET;

    if (!secret) {
      throw new Error('JWT_TOKEN_SECRET no está definido en las variables de entorno');
    }

    const dataToken: string | JwtPayload = jsonwebtoken.verify(token, secret);

    req.emailConectado = (dataToken as JwtPayload).email;
    
    // Siguiente middleware
    next();

  } catch (e: any) {
    return res.status(401).json({ error: 'Token inválido' });
  }

}
