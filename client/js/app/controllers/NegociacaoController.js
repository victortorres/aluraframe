'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        //serve para mapear o documento, ou seja, a pagina html
        //para poder acessar os valores
        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacao(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvaziar');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            //aplicar o mesmo refactoring para adicionar
            ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listarTodos();
            }).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            //este metodo eh uma especie de scheduler para poder executar
            //alfuma operacao de tempos em tempos, e o tempo eh setado
            //em milisegundos
            setInterval(function () {
                _this.importarNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adicionar',
        value: function adicionar(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criarNegociacao();

            new NegociacaoService().adicionar(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limparFormulario();
            }).catch(function (mensagem) {
                return _this2._mensagem.texto = mensagem;
            });
        }
    }, {
        key: 'apagar',
        value: function apagar() {
            var _this3 = this;

            //aplicar o mesmo refactoring para adicionar
            ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagarTodos();
            }).then(function () {
                _this3._listaNegociacoes.esvaziar();
                _this3._mensagem.texto = 'Negociações apagadas com sucesso!';
                _this3._limparFormulario();
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importarNegociacoes',
        value: function importarNegociacoes() {
            var _this4 = this;

            var negociacaoService = new NegociacaoService();

            //a promise.all recebe um array de promises, e a ordem que for passado
            //esse array sera a ordem que sera tratado, ou seja, o proximo item da
            //lista soh eh processado apos o anterior terminar, e eh centralizado
            //em um unico lugar o que deve ser feito com as promises que retornarnarem
            //com sucesso e com as que retornarem com erro
            Promise.all([negociacaoService.obterNegociacaoDaSemana(), negociacaoService.obterNegociacaoDaSemanaAnterior(), negociacaoService.obterNegociacaoDaSemanaRetrasada()])
            //os retornos do array de promises gera um array de retornos,
            //e neste caso cada promisse retorno um array, entao devo tratar
            //os arrays internos primeiro, para gerar um array simples, essa
            //operacao eh chamada de flating, pois estao achatando o array de
            //arrays em um unico array, e entao depois eh soh processar os itens
            //do array no que precisar
            .then(function (negociacoes) {
                return negociacoes.reduce(function (arrayAchatado, array) {
                    return arrayAchatado.concat(array);
                }, []);
            })
            //adicionado tratamento para nao deixar duplicar
            //os dados que ja foram importados
            .then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !_this4._listaNegociacoes.negociacoes.some(function (negociacaoExistente) {
                        return (
                            //o comando JSON.stringify eh usando para poder serializar
                            //o objeto para facilitar a comparacao, pois diferente do java, nao
                            //existe uma forma de comparar objetos, como o .equals
                            JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                        );
                    });
                });
            })
            //retorno com sucesso
            .then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return _this4._listaNegociacoes.adiciona(negociacao);
                });
                _this4._mensagem.texto = 'Negociações da semana carregadas com sucesso.';
            })
            //retorno com erro
            .catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: '_criarNegociacao',
        value: function _criarNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limparFormulario',
        value: function _limparFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();