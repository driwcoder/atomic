
import express from "express";
import db from "../db.js";
const app = express();

export function getClients() {
  app.get("/getClients", (_, res) => {
    let SQL = "SELECT * from clientes;";

    db.query(SQL, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
}
