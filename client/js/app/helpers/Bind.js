class Bind {

    //classe responsavel em linkar a alteracao do modelo
    //com a alteracao na tela
    constructor(model, view, props){
        let proxy = ProxyFactory.create(
            model,
            props,
            model => view.update(model)
        );

        view.update(model);

        return proxy;
    }

}