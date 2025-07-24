import mongoose from "mongoose"

const mascotaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ['perro', 'gato', 'conejo'],
    },
    raza: {
      type: String,
    },
    edad: {
      type: Number,
      min: [0, 'La edad no puede ser negativa'],
      max: [30, 'La edad no puede ser mayor a 30 años'],
    },
    descripcion: {
      type: String,
    },
    adoptado: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Mascotas", mascotaSchema);
