class Mensagem {

    //quando inicializo um valor
    //na assinatura do construtor
    //esse parametro passa a ser
    //opcional
    constructor(texto=''){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}