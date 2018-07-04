//apliquei o module pattern, fazendo isso eu escondo todas as variaveis
//declaradas fora da classe e deixo visivel somente o que der return, onde
//no caso foi a classe ConnectionFactory
var ConnectionFactory = (function (){

    const stores = ['negociacoes'];
    const versao = 1;
    const dbName = 'aluraframe';
    
    //esse objeto sera responsavel para guardar o objeto da conexao com
    //o indexedDB, e foi criada fora da classe pois tenho como requisito
    //ter apenas uma conexao para a aplicacao, seria um singleton
    var connection = null;
    var close = null;
    
    return class ConnectionFactory{
    
        constructor(){
            throw Error('Não é possível criar instancias de ConnectionFactory');
        }
    
        static getConnection(){
            return new Promise((resolve, reject) => {
                //faco uma requisicao para abrir uma conexao com o
                //indexedDB
                let openRequest = window.indexedDB.open(dbName, versao);
    
                //caso esteja criando o banco pela primeira vez
                //ou alterando um banco ja criado
                openRequest.onupgradeneeded = e => {
                    //o parametro enviado indica a conexao realizada
                    ConnectionFactory._createStores(e.target.result);
                };
                
                //toda vez que a conexao for aberta com sucesso
                //pode ser a primeira ou todas as outras
                openRequest.onsuccess = e => {
                    if (!connection){
                        connection = e.target.result;
                        //aplicacao de tecnica monkey patching para
                        //sobrescrever a funcionalidade padrao do close
                        //connection para que a mesma nao seja fechada
                        //- sempre usar uma funcao simples, pois o escopo
                        //de this deve ser variado
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('A conexão não pode ser fechada diretamente.');
                        }
                    }
                    resolve(connection);
                };
                
                //toda vez que ocorrer um erro
                openRequest.onerror = e => {
                    console.log(e.target.error);
    
                    reject(e.target.error.name);
                };
                
            });
        }
        
        static _createStores(connection){
            stores.forEach(store => {
                //verifica se o banco "store" ja esta criado
                if (connection.objectStoreNames.contains(store)){
                    //se sim remove
                    connection.deleteObjectStore(store);
                }
                
                //cria um novo banco e habilita o auto incremento para
                //as chaves
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }
    }
})();