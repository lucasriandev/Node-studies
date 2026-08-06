const express = require("express")
const {PrismaClient} = require("@prisma/client")
const app = express()

app.use(express.json())

app.post("/", (req,res)=>{
    const {texto, idade} = req.body

    const novoConteudo = await prisma.Exemplo.create({
        data: {
            texto: texto,
            idade: idade
        }
    })
    res.status(201).json({status: "Sucesso", dados: novoConteudo})
})

app.listen(3000, ()=>{
    console.log("Servidor ativo!")
})