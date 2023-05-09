export default class Itens{
    constructor(nome,peso){
        this.nome = nome;
        this.peso = peso;
    }

    usar(entidade){
        if (entidade.nome != undefined){
            entidade.fncES.mensagemCompleta(entidade.nome + " usou "+this.nome+" e nada aconteceu"); 
        }
    }    
}
