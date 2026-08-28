const { z } = require("zod")
const prisma = require("../prisma.js")

const mensagemSchema = z.object({
    email: z.string().min(3, "Email errado!"),
    senha: z.number().int().positive("Senha precisa ser numero positivo!"),
});

const get = async (req, res) => {
    const lista = await prisma.cadastros.findMany()
    res.status(200).json({ detalhe: lista.length, dados: lista })
}

module.exports = {
    get
}   