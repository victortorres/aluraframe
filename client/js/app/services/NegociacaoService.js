class NegociacaoService{

    obterNegociacaoDaSemana(){
        //1-retorna uma funcao que executara em caso de sucesso
        //2-retorna uma mensagem de erro em caso de erro
        return new Promise((resolve, reject) => {
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
                        resolve(JSON.parse(xhr.responseText)
                                .map(objeto => new Negociacao(  new Date(objeto.data), 
                                                                objeto.quantidade, 
                                                                objeto.valor)));
    
                        //this._mensagem.texto = "Lista de negociações carregada com sucesso.";
                    } else {
                        //do something
                        //this._mensagem.texto = "Não foi possivel carregar lista de negociações.";
                        reject('Não foi possível importar as negociações da semana.')
                    }
                }
            }
            /*configuracoes*/
    
            //processa a requisicao
            xhr.send();
        });
    }

    obterNegociacaoDaSemanaAnterior(){
        
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', 'negociacoes/anterior');
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
    
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(  new Date(objeto.data), 
                                                        objeto.quantidade, 
                                                        objeto.valor)));
    
                    } else {
                        reject('Não foi possível importar as negociações da semana anterior.')
                    }
                }
            }
    
            xhr.send();
        });
    }

    obterNegociacaoDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', 'negociacoes/retrasada');
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
    
                        resolve(JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(  new Date(objeto.data), 
                                                        objeto.quantidade, 
                                                        objeto.valor)));
    
                    } else {
                        reject('Não foi possível importar as negociações da semana retrasada.')
                    }
                }
            }
    
            xhr.send();
        });
    }    
}