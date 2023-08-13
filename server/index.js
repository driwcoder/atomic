import express from "express";
import cors from "cors";
import db from "./db.js";
const app = express();

app.use(cors());
app.use(express.json());

//GET - consumindo dados da tabela
app.get("/getClients", (req, res) => {
  let SQL = "SELECT * from clientes;";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//POST - inserindo dados na tabela
app.post("/cadastro", (req, res) => {
  const valoresPegos = [
    req.body.nome,
    req.body.sexo,
    req.body.dataNascimento,
    req.body.peso,
    req.body.altura,
    req.body.raça,
  ];
  let SQL =
    "INSERT INTO `atomicstore`.`clientes` (`nome`, `sexo`, `dataNascimento`, `peso`, `altura`, `raça`) VALUES ( ? );";

  db.query(SQL, [valoresPegos], (err, result) => {
    console.log(err);
    console.log(res.json(result));
  });
});

//PUT - editando dados da tabela
app.put("/edit/:id", (req, res) => {
  const { id } = req.params;

  const valoresPegos = [
    req.body.nome,
    req.body.sexo,
    req.body.dataNascimento,
    req.body.peso,
    req.body.altura,
    req.body.raça,
  ];

  let SQL =
    "UPDATE `atomicstore`.`clientes` SET `nome` = ?, `sexo` = ?, `dataNascimento` = ?, `peso` = ?, `altura` = ?, `raça` = ? WHERE `id` = ?;";

  db.query(SQL, [...valoresPegos, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(result);
      res.status(200).send("Cliente atualizado com sucesso!");
    }
  });
});

//DELETE - Deleta um registro da tabela

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM `atomicstore`.`clientes` WHERE `id` = ?;";

  db.query(SQL, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(result);
      res.status(200).send("Dado excluido com sucesso!");
    }
  });
});

app.listen(8888, () => {
  let data = new Date();
  console.log(`Servidor aberto desde: ${data.toLocaleString()}`);
});
