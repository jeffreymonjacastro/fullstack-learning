import mongoose from "mongoose"

const usuariosSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    clave: {
      type: String,
      required: true,
      minlength: 6,
    },
    telefono: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Usuarios", usuariosSchema);
