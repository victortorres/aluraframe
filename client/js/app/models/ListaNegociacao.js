"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacao = function () {
    function ListaNegociacao() {
        _classCallCheck(this, ListaNegociacao);

        this._negociacoes = [];
    }

    _createClass(ListaNegociacao, [{
        key: "adiciona",
        value: function adiciona(negociacao) {
            this._negociacoes.push(negociacao);
        }
    }, {
        key: "esvaziar",
        value: function esvaziar() {
            this._negociacoes = [];
        }
    }, {
        key: "negociacoes",
        get: function get() {
            return [].concat(this._negociacoes);
        }
    }]);

    return ListaNegociacao;
}();
//# sourceMappingURL=ListaNegociacao.js.map