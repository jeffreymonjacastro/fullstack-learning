import { TypedRequest, TypedResponse } from "@/types/baseTypes";
import { CrearMascotaDTO, ActualizarMascotaDTO, IMascotaDocument } from "@/types/mascotasTypes";
import mascotaModel from "../models/mascotasModel";

class mascotasController {
  constructor() {}

  async create(req: TypedRequest<CrearMascotaDTO>, res: TypedResponse<IMascotaDocument>) {
    try {
      const data: IMascotaDocument = await mascotaModel.create(req.body);
      res.status(201).json(data);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  async update(req: TypedRequest<ActualizarMascotaDTO>, res: TypedResponse<IMascotaDocument | null>) {
    try {
      const data: IMascotaDocument | null = await mascotaModel.update(req.params.id, req.body);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  async delete(req: TypedRequest, res: TypedResponse<IMascotaDocument | null>) {
    try {
      const data: IMascotaDocument | null = await mascotaModel.delete(req.params.id);
      res.status(206).json(data);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  async getAll(req: TypedRequest, res: TypedResponse<IMascotaDocument[]>) {
    try {
      const data: IMascotaDocument[] = await mascotaModel.getAll();
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }

  async getOne(req: TypedRequest, res: TypedResponse<IMascotaDocument | null>) {
    try {
      const data: IMascotaDocument | null = await mascotaModel.getOne(req.params.id);
      res.status(200).json(data);
    } catch (e: any) {
      res.status(500).send(e);
    }
  }
}

// Se exporta una instancia del controlador para ya no tener que instanciarlo en cada ruta
export default new mascotasController();