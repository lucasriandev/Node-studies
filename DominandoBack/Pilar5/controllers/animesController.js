const { PrismaClient } = require("@prisma/client");
const { z } = require("zod");

const prisma = new PrismaClient();

const mensagemSchema = z.object({
  nome: z.string().min(3, "Anime com nome errado"),
});

const get = async (req, res) => {
  const listaAnime = await prisma.anime.findMany();
  res.status(200).json({ resultado: listaAnime.length, dados: listaAnime });
};

const post = async (req, res) => {
  try {
    const mensagemValidade = mensagemSchema.parse(req.body);

    const novoAnime = await prisma.anime.create({
      data: {
        nome: mensagemValidade.nome,
      },
    });
    res.status(201).json(novoAnime);
  } catch (error) {
    res.status(404).json({ error: "Erro no post " });
  }
};

module.exports = {
  post,
  get,
};
