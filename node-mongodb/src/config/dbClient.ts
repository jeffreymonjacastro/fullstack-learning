import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';

class dbClient {
  // private client!: MongoClient;

  private client!: Promise<typeof mongoose>;
  public db!: Db; 

  constructor() {
    this.connectDB();
  }

  async connectDB() {
    // const queryString: string = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=Cluster0`;
    const queryString: string = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/adopcion?retryWrites=true&w=majority`;
    this.client = mongoose.connect(queryString);

    // Usando MongoClient
    // this.client = new MongoClient(queryString);
    // this.connectDB();
  }

  // async connectDB() {
  //   try {
  //     await this.client.connect();
  //     this.db = this.client.db(process.env.NAME_DB);
  //     console.log("Database connected successfully");
  //   } catch (e) {
  //     console.error("Database connection failed:", e);
  //     throw e;
  //   }
  // }

  async closeDB() {
    try {
      await mongoose.disconnect();
      console.log("Database connection closed successfully");
    } catch (e) {
      console.error("Error closing database connection:", e);
    }
  }
}

export default new dbClient();