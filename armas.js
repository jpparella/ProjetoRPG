import Itens from "./itens.js";

export default class Armas extends Itens{
    constructor(nome,peso,ataque,tipo,atributo_extra,atributo_valor){
        super(nome,peso);
        this.ataque = ataque;
        this.tipo = tipo;
        this.atributo_extra = atributo_extra;
        this.atributo_valor = atributo_valor;
    }

    usar(entidade){
        if (entidade.nome != undefined){
            this.#atributo_especial(entidade,1);
            entidade.forca = entidade.forca + this.ataque;
            entidade.fncES.mensagemCompleta(entidade.nome + " usou "+this.nome+" e ganhou "+this.ataque+" pontos de ataque!"); 
        }
    }    

    remover(entidade){
        if (entidade.nome != undefined){
            this.#atributo_especial(entidade,-1);
            entidade.forca = entidade.forca- this.ataque;
            entidade.fncES.mensagemCompleta(entidade.nome + " removeu "+this.nome+" e ficou perdeu "+this.ataque+" pontos de ataque!"); 
        }
    }  

    #atributo_especial(entidade,mult){

        if (this.atributo_extra == "forca"){
            entidade.forca = entidade.forca + (this.atributo_valor * mult);
        }
        if (this.atributo_extra == "inteligencia"){
            entidade.inteligencia = entidade.forca + (this.atributo_valor * mult);
        }
        if (this.atributo_extra == "sorte"){
            entidade.sorte = entidade.forca + (this.atributo_valor * mult);
        }
        if (this.atributo_extra == "velocidade"){
            entidade.velocidade = entidade.forca + (this.atributo_valor * mult);
        }   
        if (this.atributo_extra == "vida"){
            entidade.vida = entidade.forca + (this.atributo_valor * mult);
        }
    }
}
