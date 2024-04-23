import { readFile } from "fs/promises";

export const dadosJson = (async () => {
  try {
    const data = await readFile("./car-list.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return [];
  }
})();

export async function retornarMarcasComMaiorQuantidadeModelos() {
  const copyDadosJson = [...(await dadosJson)];
  const maxQtdModelos = copyDadosJson.reduce((max, marca) => {
    const qtdModelos = marca["models"].length;
    return qtdModelos > max ? qtdModelos : max;
  }, 0);

  const marcasComMaxModelos = copyDadosJson.filter(
    (marca) => marca["models"].length === maxQtdModelos
  );

  const infoMarcasComMaxModelos = marcasComMaxModelos.map((marca) => ({
    brand: marca["brand"],
    qtdModelos: marca["models"].length,
  }));

  return infoMarcasComMaxModelos;
}

export async function retornarMarcasComMenorQuantidadeModelos(dadosJson) {
  const copyDadosJson = [...(await dadosJson)];
  const minQtdModelos = copyDadosJson.reduce((min, marca) => {
    const qtdModelos = marca["models"].length;
    return qtdModelos < min ? qtdModelos : min;
  }, Infinity);

  const marcasComMinModelos = copyDadosJson.filter(
    (marca) => marca["models"].length === minQtdModelos
  );

  const infoMarcasComMinModelos = marcasComMinModelos.map((marca) => ({
    brand: marca["brand"],
    qtdModelos: marca["models"].length,
  }));

  return infoMarcasComMinModelos;
}

export async function retornarMarcasComMaisModelos(
  dadosJson,
  numeroMarcasComMaisModelos
) {
  const copiaDadosJson = [...(await dadosJson)];

  copiaDadosJson.sort((a, b) => {
    if (a["models"].length !== b["models"].length) {
      return b["models"].length - a["models"].length;
    }
    return a["brand"].localeCompare(b["brand"]);
  });

  const marcas = copiaDadosJson
    .slice(0, numeroMarcasComMaisModelos)
    .map((marca) => ({
      brand: marca["brand"],
      qtdModelos: marca["models"].length,
    }));

  return marcas;
}

export async function retornarMarcasComMenosModelos(
  dadosJson,
  numeroMarcasComMenosModelos
) {
  const copiaDadosJson = [...(await dadosJson)];

  copiaDadosJson.sort((a, b) => {
    if (a["models"].length !== b["models"].length) {
      return a["models"].length - b["models"].length;
    }
    return a["brand"].localeCompare(b["brand"]);
  });

  const marcas = copiaDadosJson
    .slice(0, numeroMarcasComMenosModelos)
    .map((marca) => ({
      brand: marca["brand"],
      qtdModelos: marca["models"].length,
    }));

  return marcas;
}

export async function listarModelosPorMarca(dadosJson, nomeMarca) {
  try {
    const nomeMarcaLowerCase = nomeMarca.toLowerCase();
    const marcaEncontrada = (await dadosJson).find(
      (marca) => marca["brand"].toLowerCase() === nomeMarcaLowerCase
    );

    if (marcaEncontrada) {
      return marcaEncontrada["models"].reduce(
        (acc, item) => (acc === "" ? item : `${acc}, ${item}`),
        ""
      );
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return [];
  }
}
