class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        

        this._listaNegociacoes = new Bind(
            new ListaNegociacao(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvaziar'
        );
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );
        
    }
    
    adicionar(event){
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                
                let negociacao = this._criarNegociacao();

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then( () => {
                        
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso!';
                        this._limparFormulario();

                    })
                    .catch(erro => this._mensagem.texto = erro);

            })
            .catch();
        

    }

    apagar(){
        this._listaNegociacoes.esvaziar();

        this._mensagem.texto = 'Negociações apagadas com sucesso!';

        this._limparFormulario();
    }

    importarNegociacoes(){
        let negociacaoService = new NegociacaoService();

        //a promise.all recebe um array de promises, e a ordem que for passado
        //esse array sera a ordem que sera tratado, ou seja, o proximo item da
        //lista soh eh processado apos o anterior terminar, e eh centralizado
        //em um unico lugar o que deve ser feito com as promises que retornarnarem
        //com sucesso e com as que retornarem com erro
        Promise.all(
            [negociacaoService.obterNegociacaoDaSemana(),
             negociacaoService.obterNegociacaoDaSemanaAnterior(),
             negociacaoService.obterNegociacaoDaSemanaRetrasada()]
        )
        //retorno com sucesso
        .then(negociacoes => {
            //os retornos do array de promises gera um array de retornos,
            //e neste caso cada promisse retorno um array, entao devo tratar
            //os arrays internos primeiro, para gerar um array simples, essa
            //operacao eh chamada de flating, pois estao achatando o array de
            //arrays em um unico array, e entao depois eh soh processar os itens
            //do array no que precisar
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana carregadas com sucesso.';
        })
        //retorno com erro
        .catch(erro => this._mensagem.texto = erro);

    }

    _criarNegociacao(){
        return new Negociacao(  DateHelper.textoParaData(this._inputData.value), 
                                parseInt(this._inputQuantidade.value), 
                                parseFloat(this._inputValor.value));
    }

    _limparFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}