class NegociacoesView{

    constructor(elemento){
        this._elemento = elemento;
    }

    _template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>

                ${
                    model.negociacoes.map(
                        (n) => {
                            return `
                            <tr>
                                <td>${DateHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            </tr>
                            `
                        }
                    ).join('')
                }

            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${
                    (function(){
                        let total = 0;
                        model.negociacoes.forEach(
                            n => total += n.volume
                        )
                    })()
                }</td>
            </tfoot>
        </table>        
        `;
    }

    update(model){
        //a funcao innerHTML converte uma string, que tenha
        //tags HTML para elementos do DOM. porem as marcacoes
        //devem estar correta
        return this._elemento.innerHTML = this._template(model);
    }


}