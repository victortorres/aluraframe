'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacaoDaSemana',
        value: function obterNegociacaoDaSemana() {
            var _this = this;

            //este promise esta recebendo um outro promise
            return new Promise(function (resolve, reject) {

                _this._http.get('negociacoes/semana').then(function (negociacoes) {
                    //essa lista ja foi tratada na promise anterior
                    //porem ela vem como um objeto json simples
                    //e aqui eu converto para uma outra classe
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível carregar as negociações da semana.');
                });
            });
        }
    }, {
        key: 'obterNegociacaoDaSemanaAnterior',
        value: function obterNegociacaoDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível carregar as negociações da semana anterior.');
                });
            });
        }
    }, {
        key: 'obterNegociacaoDaSemanaRetrasada',
        value: function obterNegociacaoDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível carregar as negociações da semana retrasada.');
                });
            });
        }
    }, {
        key: 'adicionar',
        value: function adicionar(negociacao) {
            return new Promise(function (resolve, reject) {
                ConnectionFactory.getConnection().then(function (connection) {
                    return new NegociacaoDao(connection);
                }).then(function (dao) {
                    return dao.adiciona(negociacao);
                }).then(function () {
                    return resolve('Negociação adicionada com sucesso!');
                }).catch(function (erro) {
                    return reject(erro);
                });
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map