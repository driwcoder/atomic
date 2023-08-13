import express from "express"
import cors from "cors"
import db from "./db.js";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/cadastro", (req, res) => {
  const { nome } = req.body;
  const { sexo } = req.body;
  const { dataNascimento } = req.body;
  const { peso } = req.body;
  const { altura } = req.body;
  const { raça } = req.body;

  let SQL =
    "INSERT INTO `atomicstore`.`clientes` (`nome`, `sexo`, `dataNascimento`, `peso`, `altura`, `raça`) VALUES ( ?,?,?,?,?,? );";

  db.query(
    SQL,
    [nome, sexo, dataNascimento, peso, altura, raça],
    (err, result) => {
      console.log(err);
      console.log(result);
    }
  );
});

app.get("/getClients", (req, res) => {
  let SQL = "SELECT * from clientes;";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { nome, sexo, dataNascimento, peso, altura, raça } = req.body;

  let SQL =
    "UPDATE `atomicstore`.`clientes` SET `nome` = ?, `sexo` = ?, `dataNascimento` = ?, `peso` = ?, `altura` = ?, `raça` = ? WHERE `id` = ?;";

  db.query(
    SQL,
    [nome, sexo, dataNascimento, peso, altura, raça, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        console.log(result);
        res.status(200).send("Data updated successfully.");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM `atomicstore`.`clientes` WHERE `id` = ?;";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(result);
      res.status(200).send("Data deleted successfully.");
    }
  });
});

app.listen(8888, () => {
  let data = new Date();
  console.log(`Servidor aberto desde: ${data.toLocaleString()}`);
});
