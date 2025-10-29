const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MonogoURI = '';
mongoose.connect(mongoURI,{useNewParser: true, useUnifieldTopology:true})
    .then(() => console.log('Conectado ao MonogoDB com seucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB: ',err));


const relatorioSchema = new mongoose.Schema({
    titulo: String,
    tipo: String,
    ano: Number,
    status: String,
    data_envio: Date,
    responsavel: {
        nome: String,
        cargo: String,
        departamento: String
    },
    palavras_chave: [String],
    revisoes: [{
        data: Date,
        revisado_por: String,
        comentario: String,

    }]
});

const Relatório = mongoose.model('Relatorio', relatorioSchema);

app.post('./salvar-relatorio', async(req, res) => {
    try{

        const dadosDoFormulario = req.body;

        const novoRelatorio = new Relatorio(dadosDoFormulario);

        await novoRelatorio.save();

        res.status(201).json({message: 'Relatório salvo com sucesso!'});
        console.log('Relatório salvo: ',novoRelatiorio.titulo);
        
    }catch(error){

        res.status(500).json({message: 'Ocorreu um erro ao salvar',error:error});
        console.error('Erro ao salvar: ',error);

    }
});

const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`Servidor back-end rodando na porta ${PORT}`);
});

