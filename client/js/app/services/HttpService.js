'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: 'get',
        value: function get(url) {

            //1-retorna uma funcao que executara em caso de sucesso
            //2-retorna uma mensagem de erro em caso de erro
            return new Promise(function (resolve, reject) {
                //instancio o objeto para lidar com AJAX
                var xhr = new XMLHttpRequest();
                //configuro o endereco e o metodo que sera acessado via ajax
                //se for um endereco externo, da web, deve estar o endereco completo,
                //como neste caso o endereco eh local, esta apenas o caminho relativo
                xhr.open('GET', url);

                /*configuracoes*/
                xhr.onreadystatechange = function () {
                    //0: requisição ainda não iniciada
                    //1: conexão com o servidor estabelecida
                    //2: requisição recebida
                    //3: processando requisição
                    //4: requisição está concluída e a resposta está pronta            
                    if (xhr.readyState == 4) {
                        //200-ok
                        if (xhr.status == 200) {
                            //1-o ajax retorna texto
                            //2-eh necessario converter para uma lista de json
                            resolve(JSON.parse(xhr.responseText));

                            //this._mensagem.texto = "Lista de negociações carregada com sucesso.";
                        } else {
                            //do something
                            reject(xhr.responseText);
                        }
                    }
                };
                /*configuracoes*/

                //processa a requisicao
                xhr.send();
            });
        }
    }, {
        key: 'post',
        value: function post(url, dado) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();

                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };

                xhr.send(JSON.stringify(dado));
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map