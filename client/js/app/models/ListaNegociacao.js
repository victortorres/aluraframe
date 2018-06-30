class ListaNegociacao {

    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociaca){
        this._negociacoes.push(negociaca);
    }

    get negociacoes(){
        //este comando abaixo cria uma nova lista
        //entao sempre que alguem tentar manupular
        //a lista da classe, na verdade ele estara
        //manipulando a copia da lista e nao a lista
        //da classe -> estou aplicando o conceito
        //de programacao defensiva
        return [].concat(this._negociacoes);
    }
}