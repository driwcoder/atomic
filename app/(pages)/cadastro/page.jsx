"use client";

import styles from "../../page.module.css";
import Header from "@/app/components/Header";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Cadastro() {
  const [values, setValues] = useState({
    nome: "",
    sexo: "",
    dataNascimento: "",
    peso: "",
    altura: "",
    raça: "",
  });

  const [listClients, setListClients] = useState([]);

  const handleChangeValues = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:8888/cadastro", values).then((response) => {
      console.log(response);
      setValues({
        nome: "",
        sexo: "",
        dataNascimento: "",
        peso: "",
        altura: "",
        raça: "",
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8888/getClients").then((response) => {
      setListClients(response.data);
    });
  }, []); // Adicionei um array vazio para executar apenas uma vez

  return (
    <main className={styles.cadastro}>
      <Header />

      <div className={styles.registerContainer}>
        <div className={styles.crud}>
          <form className={styles.forms}>
            <h1 className={styles.registerTitle}>Cadastro de Pessoa</h1>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              className={styles.registerInput}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="sexo"
              placeholder="Sexo"
              className={styles.registerInput}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="dataNascimento"
              placeholder="Data de Nascimento (1994-12-31)"
              className={styles.registerInput}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="peso"
              placeholder="Peso (71.10)"
              className={styles.registerInput}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="altura"
              placeholder="Altura (1.70)"
              className={styles.registerInput}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="raça"
              placeholder="Qual tua raça?"
              className={styles.registerInput}
              onChange={handleChangeValues}
            />
            <button
              className={styles.registerButton}
              onClick={() => handleClickButton()}
            >
              Cadastrar
            </button>
          </form>
        </div>

        <div className={styles.tabela}>
          <h1>Tabela</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>Sexo</th>
                <th className={styles.th}>Data de Nascimento</th>
                <th className={styles.th}>Peso</th>
                <th className={styles.th}>Altura</th>
                <th className={styles.th}>Raça</th>
              </tr>
            </thead>
            <tbody>
              {listClients &&
                listClients.map((value) => (
                  <tr key={value.id}>
                    <td className={styles.td}>{value.id}</td>
                    <td className={styles.td}>{value.nome}</td>
                    <td className={styles.td}>{value.sexo}</td>
                    <td className={styles.td}>{value.dataNascimento}</td>
                    <td className={styles.td}>{value.peso}</td>
                    <td className={styles.td}>{value.altura}</td>
                    <td className={styles.td}>{value.raça}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Cadastro;
