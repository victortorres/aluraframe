class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        //vinculo o escopo do objeto local
        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacao(), {
            //target-> objeto que o proxy esta embrulhando
            //prop-> 
            //receiver-> 
            get(target, prop, receiver){
                if(['adiciona', 'esvaziar'].includes(prop) &&
                    typeof(target[prop]) == typeof(Function)){
                    
                    return function(){
                        self._negociacoesView.update(target)
                        Reflect.apply(target[prop], target, arguments);
                    }

                }
                return Reflect.get(target, prop, receiver);
            }
        });
        
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