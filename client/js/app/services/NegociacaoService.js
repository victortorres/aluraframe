class NegociacaoService{

    obterNegociacaoDaSemana(cb){
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
                    cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    //this._mensagem.texto = "Lista de negociações carregada com sucesso.";
                } else {
                    //do something
                    //this._mensagem.texto = "Não foi possivel carregar lista de negociações.";
                    cb('Não foi possível importar as negociações.')
                }
            }
        }
        /*configuracoes*/

        //processa a requisicao
        xhr.send();
    }
}