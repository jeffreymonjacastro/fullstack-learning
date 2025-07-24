import { generarToken } from "@/helpers/auth";
import usuariosModel from "@/models/usuariosModel";
import { TypedRequest, TypedResponse } from "@/types/baseTypes";
import { CrearUsuarioDTO, ActualizarUsuarioDTO, IUsuarioDocument, LoginDTO } from "@/types/usuariosTypes";
import bcrypt from "bcrypt";

class usuariosController {
  constructor() {}

  async register(
    req: TypedRequest<CrearUsuarioDTO>,
    res: TypedResponse<IUsuarioDocument | { error: string }>
  ) {
    try {
      // Validaciones
      const { nombre, email, clave, telefono } = req.body;

      const usuarioExiste: IUsuarioDocument | null = await usuariosModel.getByEmail(email);

      if (usuarioExiste) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      const claveEncriptada: string = await bcrypt.hash(clave, 10);

      const user: CrearUsuarioDTO = {
        nombre,
        email,
        clave: claveEncriptada,
        telefono: telefono
      };

      const data: IUsuarioDocument = await usuariosModel.create(user);

      res.status(201).json(data);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  async login(req: TypedRequest<LoginDTO>, res: TypedResponse<string | { error: string }>) {
    const { email, clave } = req.body;

    const usuarioExiste: IUsuarioDocument | null = await usuariosModel.getByEmail(email);

    if (!usuarioExiste) {
      return res.status(400).json({ error: "El usuario no existe" });
    }

    const claveValida: boolean = await bcrypt.compare(clave, usuarioExiste.clave);

    if (!claveValida) {
      return res.status(400).json({ error: "La contraseña es incorrecta" });
    }

    const token = generarToken(email);

    res.status(200).json(token);
  }

  async profile(req: TypedRequest, res: TypedResponse<IUsuarioDocument | null | { error: string }>) {
    if (!req.emailConectado) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    try {
      const usuario: IUsuarioDocument | null = await usuariosModel.getByEmail(req.emailConectado);
      res.status(200).json(usuario);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }
}

export default new usuariosController();