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

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('A data deve estar no formato yyyy-MM-dd');

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
        /* data.getDate() + '/' + 
        (data.getMonth() + 1) + '/' + 
        data.getFullYear(); */        
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

}