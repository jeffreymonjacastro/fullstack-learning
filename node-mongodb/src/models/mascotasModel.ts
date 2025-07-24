import dbClient from '../config/dbClient';
// import { ObjectId, Collection } from 'mongodb';
import { Types } from 'mongoose';
import Mascota from '../schemas/mascotaSchema'; // mongoose schema
import { IMascotaDocument, CrearMascotaDTO, ActualizarMascotaDTO } from '../types/mascotasTypes';

class mascotasModel {
  constructor() {}

  async create(mascota: CrearMascotaDTO): Promise<IMascotaDocument> {
    return await Mascota.create(mascota);
  }

  async update(id: string, mascota: ActualizarMascotaDTO): Promise<IMascotaDocument | null> {
    return await Mascota.findOneAndUpdate({ _id: new Types.ObjectId(id) }, mascota, { new: true });
  }

  async delete(id: string): Promise<IMascotaDocument | null> {
    return await Mascota.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }

  async getAll(): Promise<IMascotaDocument[]> {
    return await Mascota.find();
  }

  async getOne(id: string): Promise<IMascotaDocument | null> {
    return await Mascota.findById(id);
  }
}

// Usando dbClient
// class mascotasModel {
//   private collectionName = 'mascotas';

//   constructor() {}

//   private get collection(): Collection {
//     return dbClient.db.collection(this.collectionName);
//   }

//   async create(mascota: any): Promise<any> {
//     return await this.collection.insertOne(mascota);
//   }

//   async update(id: string, mascota: any): Promise<any> {
//     return await this.collection.updateOne({_id: new ObjectId(id)}, {$set: mascota});
//   }

//   async delete(id: string): Promise<any> {
//     return await this.collection.deleteOne({_id: new ObjectId(id)});
//   }

//   async getAll(): Promise<any[]> {
//     return await this.collection.find({}).toArray();
//   }

//   async getOne(id: string): Promise<any> {
//     return await this.collection.findOne({ _id: new ObjectId(id) });
//   }
// }

export default new mascotasModel();