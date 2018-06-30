class ListaNegociacao {

    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociaca){
        this._negociacoes.push(negociaca);
    }

    get negociacoes(){
        return this._negociacoes;
    }
}