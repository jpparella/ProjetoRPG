import FuncoesES from './EntradaSaida.js';
import FuncoesDado from './Dado.js';

export class Entidade{    
    #tipoEntidade
    constructor(nome,velocidade,vida,tipoEntidade = "a Entidade"){
        this.fncES = new FuncoesES();
        this.fncDado = new FuncoesDado();
        this.nome = nome;
        this.velocidade = velocidade;
        this.vida = vida;
        this.#tipoEntidade = tipoEntidade;
    }
    get tipoEntidade(){
        return this.#tipoEntidade;
    }
    
    nomeCompleto(){
        return this.#tipoEntidade + " "+this.nome;
    }
    correr(){
        return this.fncDado.rolarAtributos(this.sorte,this.velocidade);
    }
    status(){
        this.fncES.mensagemSimples("***********************************");;
        this.fncES.mensagemSimples("O " + this.nomeCompleto()+" conta com os seguintes status:");
        this.fncES.mensagemSimples("Velocidade: " +this.velocidade)
        this.fncES.mensagemSimples("Vida: " +this.vida)
        this.fncES.mensagemSimples("***********************************");
    }

    andar(){
        return this.fncDado.rolarAtributos(this.sorte,parseInt(this.velocidade/2));
    }

    falar(mensagem){
        this.fncES.mensagemCompleta(this.nomeCompleto()+" falou: "+mensagem);
    }    
}

export class Player extends Entidade{    
    #arma
    constructor(nome,velocidade,vida,forca,inteligencia,sorte,tipoEntidade = "o Player"){        
        super(nome,velocidade,vida,tipoEntidade)
        this.forca = forca;
        this.inteligencia = inteligencia;
        this.sorte = sorte;
    }
    atacar(){
        return this.fncDado.rolarAtributos(this.sorte,parseInt(this.forca));           
    }   
    persuadir(){
        return this.fncDado.rolarAtributos(this.sorte,parseInt(this.velocidade/2));
    } 
    equiparArma(arma){
        this.desequiparArma();
        this.#arma = arma;
        this.#arma.usar(this);
    }
    status(test){
        this.fncES.mensagemSimples("***********************************");;
        this.fncES.mensagemSimples("O " + this.nomeCompleto()+" conta com os seguintes status:");
        this.fncES.mensagemSimples("Velocidade: " +this.velocidade)
        this.fncES.mensagemSimples("Vida: " +this.vida)
        this.fncES.mensagemSimples("Inteligencia: " +this.inteligencia)
        this.fncES.mensagemSimples("Sorte: " +this.sorte)
        this.fncES.mensagemSimples("Força: " +this.forca)
        this.fncES.mensagemSimples("***********************************");
    }
    desequiparArma(){
        if (this.#arma != null){
           
            this.#arma.remover(this);
            this.#arma = null;
        }
    }
}