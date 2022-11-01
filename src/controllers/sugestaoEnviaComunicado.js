const comunicado = require('../models/comunicado');
const sugestao = require('../models/sugestoesBairros');
const sugestaoDBO = require('../database/dbo/sugestoesBairrosDBO');


const inclusao = async (req, res) => {

  let novaSugestao;

  try {
        novaSugestao = sugestao.novaSugestao(req.body.id, req.body.sugestoesBairro);
    }
    catch (error) {
      
        const erro = comunicado.novoComunicado('TDE', 'Dados de tipos errados', 'Dados fornecidos incorretos').object;
        return res.status(422).json(erro);
    }

    const ret = sugestaoDBO.inclua(novaSugestao);

    if (ret === null) {
        const erro = comunicado.novoComunicado('CBD', 'Sem conexao com o BD', 'Não foi possivel estabelecer conexao com o banco de dados').object;

        return res.status(500).json(erro);
    }

    if (ret === false) {
        const erro = comunicado.novoComunicado('USE', 'Usuario já existe', 'Já existe um Usuario com esse id').object;
        return res.status(409).json(erro);
    }

    const sucesso = comunicado.novoComunicado('IBS', 'Inclusao bem sucedida', 'Incluido com sucesso').object;
    return res.status(201).json(sucesso);

}

const recuperaTodos = async (req, res) => {

    if(Object.values(req.body).length != 0){
        const erro = comunicado.novo('DSP', 'Fornecimento de dados sem proposito', 'Foram fornecidos dados desnecessarios').object;
        
        return res.status(422).json(erro);
    } 

    const ret = await sugestaoDBO.recuperaTodos();

    if (ret === null) {
        const erro = comunicado.novoComunicado('CBD', 'Sem conexao com o BD', 'Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro);

    } else if (ret === false) {
        const erro = comunicado.novoComunicado('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro);

    } else if (ret.length === 0) {
        const erro = comunicado.novoComunicado('UNE', 'Usuario inexistente', 'Não há Usuario cadastrado com esse id').object;
        return res.status(404).json(erro);

    } else {
        return res.status(200).json(ret);
    }
}

const recupera = async (req, res) => {
  
  if (Object.values(req.body).length != 0) {
        const erro = comunicado.novo('DSP', 'Fornecimento de dados sem proposito', 'Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro);
    }

    const id = req.params.id;
    const ret = await sugestaoDBO.recupera(id);


    if (ret === null) {
        const erro = comunicado.novoComunicado('CBD', 'Sem conexao com o BD', 'Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro);

    } else if (ret === false) {
        const erro = comunicado.novoComunicado('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro);

    } else if (ret.length === 0) {
        const erro = comunicado.novoComunicado('UNE', 'Usuario inexistente', 'Não há Usuario cadastrado com esse id').object;
        return res.status(404).json(erro);

    } else {
        return res.status(200).json(ret);
    }
}

const remove = async (req, res) => {

    if (Object.values(req.body).length !== 0) {
        const erro = comunicado.novoComunicado('DSP', 'Fornecimento de dados sem proposito', 'Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro);
    }

    const id = req.params.id;
    let ret = await sugestaoDBO.recupera(id);

    if (ret === null) {
        const erro = comunicado.novoComunicado('CBD', 'Sem conexao com o BD', 'Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro);
    }
    else if (ret === false) {
        const erro = comunicado.novoComunicado('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    else if (ret.length == 0) {
        const erro = comunicado.novoComunicado('UNE', 'Usuario inexistente', 'Não há usuario cadastrado com esse id').object;
        return res.status(404).json(erro);
    } else {

        ret = await sugestaoDBO.remove(id);
    }

    if (ret === null) {
        const erro = comunicado.novoComunicado('CBD', 'Sem conexao com o BD', 'Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro);
    }

    else if (ret === false) {
        const erro = comunicado.novoComunicado('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    } else {

        const sucesso = comunicado.novoComunicado('RBS', 'Remoçao bem sucedida', 'O usuario removido com sucesso').object;
        return res.status(201).json(sucesso);
    }
}

module.exports = {inclusao, remove, recupera, recuperaTodos}