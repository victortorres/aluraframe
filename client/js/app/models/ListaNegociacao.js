class ListaNegociacao {

    constructor(armadiha){
        this._negociacoes = [];
        this._armadiha = armadiha;
    }

    adiciona(negociaca){
        this._negociacoes.push(negociaca);
        this._armadiha(this);
    }

    esvaziar(){
        this._negociacoes = [];
        this._armadiha(this);
    }
    
    get negociacoes(){
        return [].concat(this._negociacoes);
    }
}