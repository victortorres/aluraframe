class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacaoDaSemana(){
        //este promise esta recebendo um outro promise
        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    //essa lista ja foi tratada na promise anterior
                    //porem ela vem como um objeto json simples
                    //e aqui eu converto para uma outra classe
                    resolve(negociacoes.map(
                        objeto => new Negociacao(   new Date(objeto.data), 
                                                    objeto.quantidade, 
                                                    objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível carregar as negociações da semana.');
                });
        });
    }

    obterNegociacaoDaSemanaAnterior(){
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(
                        objeto => new Negociacao(   new Date(objeto.data), 
                                                    objeto.quantidade, 
                                                    objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível carregar as negociações da semana anterior.');
                });
        });
    }

    obterNegociacaoDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(
                        objeto => new Negociacao(   new Date(objeto.data), 
                                                    objeto.quantidade, 
                                                    objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível carregar as negociações da semana retrasada.');
                });
        });        
    }
    
    adicionar(negociacao){
        return new Promise((resolve, reject) => {
            ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.adiciona(negociacao))
                .then( () => resolve('Negociação adicionada com sucesso!'))
                .catch(erro => reject(erro));
        });
    }
}