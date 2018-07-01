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

        this._listaNegociacoes.adiciona(this._criarNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        
        this._limparFormulario();
    }

    apagar(){
        this._listaNegociacoes.esvaziar();

        this._mensagem.texto = 'Negociações apagadas com sucesso!';

        this._limparFormulario();
    }

    importarNegociacoes(){
        //instancio o objeto para lidar com AJAX
        let xhr = new XMLHttpRequest();
        //configuro o endereco e o metodo que sera acessado via ajax
        //se for um endereco externo, da web, deve estar o endereco completo,
        //como neste caso o endereco eh local, esta apenas o caminho relativo
        xhr.open('GET', 'negociacoes/semana');

        /*configuracoes*/
        xhr.onreadystatechange = () => {
            //0: requisição ainda não iniciada
            //1: conexão com o servidor estabelecida
            //2: requisição recebida
            //3: processando requisição
            //4: requisição está concluída e a resposta está pronta            
            if (xhr.readyState == 4){
                //200-ok
                if (xhr.status == 200){
                    //1-o ajax retorna texto
                    //2-eh necessario converter para uma lista de json
                    //3-faco um map na lista para poder criar uma negociacao para cada item
                    //4-para cada item que o map processar eu adiciono a lista
                    JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                    this._mensagem.texto = "Lista de negociações carregada com sucesso.";
                } else {
                    //do something
                    this._mensagem.texto = "Não foi possivel carregar lista de negociações.";
                }
            }
        }
        /*configuracoes*/

        //processa a requisicao
        xhr.send();
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