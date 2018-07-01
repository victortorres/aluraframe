class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        //vinculo o escopo do objeto local
        let self = this;
        //argumento 1 -> passamos o objeto alvo
        //argumento 2 -> passamos um handler(funcao), que seria
        //um interceptor para processar algo antes de um metodo
        //executar a sua operacao padrao
        this._listaNegociacoes = new Proxy(new ListaNegociacao(), {
            //target-> objeto que o proxy esta embrulhando, neste
            //caso o modelo
            //prop-> eh a propriedade que esta sendo lida
            //receiver-> eh uma referencia ao proprio proxy
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