class HttpService{

    get(url){

        //1-retorna uma funcao que executara em caso de sucesso
        //2-retorna uma mensagem de erro em caso de erro
        return new Promise((resolve, reject) => {
            //instancio o objeto para lidar com AJAX
            let xhr = new XMLHttpRequest();
            //configuro o endereco e o metodo que sera acessado via ajax
            //se for um endereco externo, da web, deve estar o endereco completo,
            //como neste caso o endereco eh local, esta apenas o caminho relativo
            xhr.open('GET', url);
    
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
                        resolve(JSON.parse(xhr.responseText));
    
                        //this._mensagem.texto = "Lista de negociações carregada com sucesso.";
                    } else {
                        //do something
                        reject(xhr.responseText);
                    }
                }
            }
            /*configuracoes*/
    
            //processa a requisicao
            xhr.send();
        });

    }

    post(url, dado){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4){

                    if (xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
    
                    } else {
                        reject(xhr.responseText);
                    }

                }
            }

            xhr.send(JSON.stringify(dado));
        });
    }    
}