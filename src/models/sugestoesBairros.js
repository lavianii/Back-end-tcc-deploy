class SugestoesBairros {
    #id
    #sugestoesBairro

    constructor(id,sugestoesBairro) {
      this.#id = id;
      this.#sugestoesBairro = sugestoesBairro;
    }
    get id() {
        return this.#id;
    }
    get sugestoesBairro() {
        return this.#sugestoesBairro;
    }

    set id(id) {
        if(id === undefined || typeof id  !== "number" || id === null){
            throw('Id inválido !');
        }
        this.#id = id;
    }

    set sugestoesBairro(sugestoesBairro) {
        if (sugestoesBairro === undefined || typeof sugestoesBairro !== "string" || sugestoesBairro === '') {
            throw ('Sugestoes de bairros de inválido !');
        }
        this.#sugestoesBairro = sugestoesBairro;
    }

}

const novaSugestao = (id, sugestoesBairro) => {

    return new SugestoesBairros(id, sugestoesBairro);

}


module.exports = { novaSugestao }