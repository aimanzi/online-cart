import signupdata from "../model/signup.mjs";
import mongoose, { model } from "mongoose";

//connecting using mongoose

class ConnectingToMDB {
  //connecting to DB:
  static async connent() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      socketTimeoutMS: 10000,
    };

    const url =
      "mongodb+srv://aimanzi:12345@cluster1.fyxgckl.mongodb.net/onlineshop";
    await mongoose
      .connect(url, options)
      .then(() => {
        console.log("DataBase staus:", "connecting to DataBase Succsess");
      })
      .catch((err) => {
        console.error("Error disconnecting from database:", err);
      });
  }

  //disconnect from DB:
  static async disconnect() {
    setTimeout(() => {
      mongoose
        .disconnect()
        .then(() => {
          console.log("DataBase staus:", "disconnecting from MongoDB Succsess");
        })
        .catch((err) => {
          console.error("Error disconnecting from database:", err);
        });
    }, 1000);
  }
}

export default { ConnectingToMDB };
