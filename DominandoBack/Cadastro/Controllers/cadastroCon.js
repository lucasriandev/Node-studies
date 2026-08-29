const { z } = require("zod");
const prisma = require("../prisma.js");

const mensagemSchema = z.object({
  email: z.string().min(3, "Email errado!"),
  senha: z.number().int().positive("Senha precisa ser numero positivo!"),
});

const get = async (req, res) => {
  const lista = await prisma.cadastros.findMany();
  res.status(200).json({ detalhe: lista.length, dados: lista });
};

const post = async (req, res) => {
  try {
    const mensagemValidade = mensagemSchema.parse(req.body);

    const novoCadastro = await prisma.cadastros.create({
      data: {
        email: mensagemValidade.email,
        senha: mensagemValidade.senha,
      },
    });

    res.status(201).json({ novoCadastro });
  } catch (error) {
    res.status(404).json({ status: "erro no post", error });
  }
};

module.exports = {
  get,
  post,
};
