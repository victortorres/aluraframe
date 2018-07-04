class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

        return new Promise((resolve, reject) => {
            //1-abre uma transaction
            //2-pega a store (tabela)
            //3-chama o insert e pega um request
            let request = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .add(negociacao);

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível cadastrar a negociação.');
            }
        });

    }

    listarTodos(){
        console.log('iniciando limpar todos');
        return new Promise((resolve, reject) => {
            //1-abre uma transaction
            //2-pega a store (tabela)
            //3-pega um cursor com a posicao do primeiro elemento
            let cursor = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .openCursor();

            let negociacoes = [];
            
            //em caso de sucesso sera executado
            cursor.onsuccess = e => {
                //aponta para item do cursor
                let atual = e.target.result;

                //testa se valor eh valido
                if (atual){
                    //pega o valor
                    let dado = atual.value;

                    //adiciona na lista
                    negociacoes.push(new Negociacao(dado._data,
                                                    dado._quantidade,
                                                    dado._valor));
                    
                    //chama o proximo valor do cursor, e volta para o onsuccess
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            }

            //em caso de erro sera executado
            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações.');
            }
        });
    }

    apagarTodos(){
        return new Promise((resolve, reject) => {
            //1-abre uma transaction
            //2-pega a store (tabela)
            //3-chama o delete e pega um request
            let request = this._connection
                            .transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .clear();

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as negociações.');
            }
        });       
    }

}