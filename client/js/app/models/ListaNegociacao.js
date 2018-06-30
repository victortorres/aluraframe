class ListaNegociacao {

    constructor(contexto, armadiha){
        this._negociacoes = [];
        this._armadiha = armadiha;
        this._contexto = contexto;
    }

    adiciona(negociaca){
        this._negociacoes.push(negociaca);
        //chamada da classe reflection do ecma6
        //1-funcao para ser chamada
        //2-contexto que quero executar
        //3-lista de parametros para a funcao que quero
        //chamar
        Reflect.apply(this._armadiha, this._contexto, [this]);
    }

    esvaziar(){
        this._negociacoes = [];
        Reflect.apply(this._armadiha, this._contexto, [this]);
    }
    
    get negociacoes(){
        return [].concat(this._negociacoes);
    }
}