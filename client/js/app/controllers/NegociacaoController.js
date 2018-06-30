class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacao(
            //this - sera o parametro que carregara o
            //contexto da origem da chamada, neste caso
            //a classe NegociacaoController
            //------
            //estou passando uma funcao anonima para ser
            //executada dentro da classe ListaNegociacao
            //quando for chamada outras funcoes, e estou
            //passando um objeto que sera referenciado 
            //dentro da classe
            //------            
            this,
            function(model){
                this._negociacoesView.update(model);
            }
        );
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
    }
    
    adicionar(event){
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criarNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._mensagemView.update(this._mensagem);
        
        this._limparFormulario();
    }

    apagar(){
        this._listaNegociacoes.esvaziar();

        this._mensagem.texto = 'Negociações apagadas com sucesso!';
        this._mensagemView.update(this._mensagem);

        this._limparFormulario();
    }

    _criarNegociacao(){
        return new Negociacao(  DateHelper.textoParaData(this._inputData.value), 
                                this._inputQuantidade.value, 
                                this._inputValor.value);
    }

    _limparFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}