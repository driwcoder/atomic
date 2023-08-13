import {db} from "../db";

export const getClients = (_, res) => {
  let SQL = "SELECT * from clientes;";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      res.status(22).json(result);
    }
  });
};