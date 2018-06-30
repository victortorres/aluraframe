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

    }
    
    adicionar(event){
        event.preventDefault();

        let helper = new DateHelper();

        let data = helper.textoParaData(this._inputData.value);

        let negociacao = new Negociacao(data, 
                                        this._inputQuantidade.value, 
                                        this._inputValor.value);
        
        let dataFormatada = helper.dataParaTexto(negociacao.data);
        
        console.log(dataFormatada);
        console.log('Data: ' + this._inputData.value + 
                    ' | Quantidade: ' + this._inputQuantidade.value + 
                    ' | Valor: ' + this._inputValor.value);
    }
}