"use client";

import styles from "../../page.module.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

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

  // Carrega os itens do banco de na tela
  useEffect(() => {
    Axios.get("http://localhost:8888/getClients").then((dados) => {
      setListClients(dados.data);
    });
  }, []); // Array vazio para executar apenas uma vez

  // Função que pega os dados dos inputs
  const handleChangeValues = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Função que adiciona um item ao banco de dados
  const handleClickButton = () => {
    Axios.post("http://localhost:8888/cadastro", values).then(
      (dadosInputados) => {
        console.log(dadosInputados);
        //aqui setamos os valores
        setValues(values);
      }
    );
    document.location.reload();
  };

  // Função que edita um item

  // Função de deletar um item
  const handleDelete = async (id) => {
    await Axios.delete(`http://localhost:8888/delete/${id}`).then(
      ({ data }) => {
        setListClients(listClients);
        toast.success(data);
      }
    );
    document.location.reload();
  };

  return (
    <main className={styles.cadastro}>
      <div className={styles.registerContainer}>
        <div className={styles.crud}>
          {/* FORMULÁRIO */}
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
              type="date"
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
              type="submit"
              className={styles.registerButton}
              onClick={() => handleClickButton()}
            >
              Cadastrar
            </button>
          </form>
        </div>

        <div className={styles.tabela}>
          <h1>Tabela</h1>
          {/* TABELA */}
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
                    <td className={styles.td}>
                      <FaTrash onClick={() => handleDelete(value.id)} />
                    </td>
                    <td className={styles.td}>
                      <FaEdit  />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        autoClose={5000}
        position={toast.POSITION.BOTTOM_RIGHT}
        className={styles.toast}
      />
    </main>
  );
}

export default Cadastro;
