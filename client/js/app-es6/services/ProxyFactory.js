class ProxyFactory{

    static create(objeto, props, acao){

        //argumento 1 -> passamos o objeto alvo
        //argumento 2 -> passamos um handler(funcao), que seria
        //um interceptor para processar algo antes de um metodo
        //executar a sua operacao padrao
        return new Proxy(objeto, {
            //target-> objeto que o proxy esta embrulhando, neste
            //caso o modelo
            //prop-> eh a propriedade que esta sendo lida
            //receiver-> eh uma referencia ao proprio proxy
            get(target, prop, receiver){
                if(props.includes(prop) &&
                   ProxyFactory._ehFuncao(target[prop])){
                    
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }

                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver){
                if(props.includes(prop)){
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
        

    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function)
    }

}