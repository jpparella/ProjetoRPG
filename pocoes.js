import Itens from "./itens.js";

export default class Pocoes extends Itens{
    #capacidade
    #tipo
    constructor(nome,peso,tipo,capacidade){
        super(nome,peso)
        this.#tipo = tipo;
        this.#capacidade = capacidade;
    }

    get tipo(){
        return this.#tipo;
    }

    get capacidade(){
        return this.#capacidade;
    }

    usar(entidade){
        if (entidade.nome != undefined){
            entidade.fncES.mensagemCompleta(entidade.nome + " usou "+this.nome+" e ganhou "+this.capacidade+" pontos de "+this.tipo);
            if (this.tipo == "forca"){
                entidade.forca = entidade.forca + this.capacidade;
            }else if (this.tipo == "vida"){
                entidade.vida = entidade.vida + this.capacidade;
            }else if (this.tipo == "inteligencia"){
                entidade.inteligencia = entidade.inteligencia + this.capacidade;
            }else if (this.tipo == "sorte"){
                entidade.sorte = entidade.sorte + this.capacidade;
            }else if (this.tipo == "velocidade"){
                entidade.velocidade = entidade.velocidade + this.capacidade;
            }
        }
    }    
}