import { Types } from 'mongoose';
import Usuarios from '@/schemas/usuariosSchema'; 
import { IUsuarioDocument, CrearUsuarioDTO, ActualizarUsuarioDTO } from '@/types/usuariosTypes';

class usuariosModel {
  constructor() {}

  async create(usuario: CrearUsuarioDTO): Promise<IUsuarioDocument> {
    return await Usuarios.create(usuario);
  }

  async update(id: string, usuario: ActualizarUsuarioDTO): Promise<IUsuarioDocument | null> {
    return await Usuarios.findOneAndUpdate({ _id: new Types.ObjectId(id) }, usuario, { new: true });
  }

  async delete(id: string): Promise<IUsuarioDocument | null> {
    return await Usuarios.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }

  async getAll(): Promise<IUsuarioDocument[]> {
    return await Usuarios.find();
  }

  async getOne(id: string): Promise<IUsuarioDocument | null> {
    return await Usuarios.findById(id);
  }

  async getByEmail(email: string): Promise<IUsuarioDocument | null> {
    return await Usuarios.findOne({ email });
  }
}

export default new usuariosModel();