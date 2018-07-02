var stores = ['negociacoes'];
var versao = 1;
var dbName = 'aluraframe';

class ConnectionFactory{

    constructor(){
        throw Error('Não é possível criar instancias de ConnectionFactory');
    }

    static getConnection(){
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, versao);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };
            
            openRequest.onsuccess = e => {
                resolve(e.target.result);
            };
            
            openRequest.onerror = e => {
                console.log(e.target.error);

                reject(e.target.error.name);
            };
            
        });
    }
    
    static _createStores(connection){
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)){
                connection.deleteObjectStore(store);
            }
    
            connection.createObjectStore(store, {autoIncrement: true});
        });
    }
}