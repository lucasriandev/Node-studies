const { z } = require("zod");

const mensagemSchema = z.object({
  nome: z.string().min(3, "Anime precisa ter mais de 3 letras"),
});

const get = async (req, res) => {
  const listaAnime = await prisma.anime.findMany();
  res.status(200).json({ datalhe: listaAnime.length, dados: listaAnime });
};

const post = async (req, res) => {
  try {
    const mensagemValidade = mensagemSchema.parse(req.body);

    const novoAnime = await prisma.anime.create({
      data: {
        nome: mensagemValidade.nome,
      },
    });
    res.status(201).json({ status: "Sucesso no post", dados: novoAnime });
  } catch (error) {
    res.status(404).json({ status: "Erro no post!" });
  }
};

module.exports = {
  get,
  post,
};
