class DateHelper {

    //caso nao declare um construtor na classe, o construtor
    //padrao existira, que eh um construtor sem parametros
    constructor(){
        throw new Error('DateHelper não pode ser instanciada.');
    }

    static textoParaData(texto){

        //usando arrow function
/*         let data = new Date(
            ...
            this._inputData.value
                .split('-')
                .map((item, indice) => {
                    if (indice == 1){
                        return item - 1;
                    }
                    return item;
                })
        ); */

        //let data2 = new Date(this._inputData.value.replace(/-/g, ','));

        return new Date(
            ...
            texto
                .split('-')
                .map(function(item, indice){
                    if (indice == 1){
                        return item - 1;
                    }
                    return item;
                })
        );
    }

    static dataParaTexto(data){
        return data.getDate() + '/' + 
        (data.getMonth() + 1) + '/' + 
        data.getFullYear();
    }

}