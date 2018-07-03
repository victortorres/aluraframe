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

}