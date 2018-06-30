class NegociacaoController {

    constructor(){
        //manter essa chamada no constructor eu
        //faco com que o DOM seja acessado uma
        //unica vez, que é no momento que a classe
        //eh construido
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacao();

    }
    
    adicionar(event){
        event.preventDefault();

        let negociacao = new Negociacao(DateHelper.textoParaData(this._inputData.value), 
                                        this._inputQuantidade.value, 
                                        this._inputValor.value);
            
        this._listaNegociacoes.adiciona(negociacao);

        this._limparFormulario();
    }

    _limparFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}