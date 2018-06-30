class NegociacoesView{

    constructor(elemento){
        this._elemento = elemento;
    }

    _template(){
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
            </tbody>
            
            <tfoot>
            </tfoot>
        </table>        
        `;
    }

    update(){
        //a funcao innerHTML converte uma string, que tenha
        //tags HTML para elementos do DOM. porem as marcacoes
        //devem estar correta
        return this._elemento.innerHTML = this._template();
    }


}