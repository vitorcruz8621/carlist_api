import express from "express";
import {
  dadosJson,
  listarModelosPorMarca,
  retornarMarcasComMaiorQuantidadeModelos,
  retornarMarcasComMaisModelos,
  retornarMarcasComMenorQuantidadeModelos,
  retornarMarcasComMenosModelos,
} from "./util.js";

const app = express();
const PORT = 3000;
const router = express.Router();
const OK = 200;

app.use(express.json());

router.get("/maisModelos", async (req, res) => {
  let retorno = await retornarMarcasComMaiorQuantidadeModelos(dadosJson);
  res.status(OK).json(retorno);
});

router.get("/menosModelos", async (req, res) => {
  let retorno = await retornarMarcasComMenorQuantidadeModelos(dadosJson);
  res.status(OK).json(retorno);
});

router.get("/listaMaisModelos/:numero", async (req, res) => {
  let retorno = await retornarMarcasComMaisModelos(
    dadosJson,
    parseInt(req.params.numero)
  );
  res.status(OK).json(retorno);
});

router.get("/listaMenosModelos/:numero", async (req, res) => {
  let retorno = await retornarMarcasComMenosModelos(
    dadosJson,
    parseInt(req.params.numero)
  );
  res.status(OK).json(retorno);
});

router.post("/listaModelos", async (req, res) => {
  console.log("Executando => listaModelos_5");
  debugger;
  const nomeDaMarca = req.body.brand;
  const retorno = await listarModelosPorMarca(dadosJson, nomeDaMarca);
  const resposta = JSON.stringify(retorno);
  console.log(resposta);
  res.write(retorno);
  res.status(OK).end();
});

app.use("/carros", router);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
