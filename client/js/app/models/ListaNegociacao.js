class ListaNegociacao {

    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociaca){
        this._negociacoes.push(negociaca);
    }

    esvaziar(){
        this._negociacoes = [];
    }
    
    get negociacoes(){
        return [].concat(this._negociacoes);
    }
}