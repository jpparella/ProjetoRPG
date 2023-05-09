import * as Entidades from './Entidades.js';
import FuncoesES from './EntradaSaida.js';
import Pocoes from './pocoes.js';
import Armas from './armas.js';

class acoesRPGEntidadesBatalha{
    constructor(p1,p2){
        this.fncES = new FuncoesES();
        this.opAtaques = ["Ataque","Fuga","Conversa","UsarPocao"]
        this.p1 = p1;
        this.p2 = p2;
    }
    pergOpAtaques(){
        var opcao = this.fncES.perguntaMenu(this.opAtaques);
        switch (opcao) {
            case 0:                
                return this.ataque(this.p1, this.p2);  
            case 1:
                return this.fuga(this.p1, this.p2);
            case 2:
                return this.conversa(this.p1, this.p2);
            case 3:
                return this.pocao(this.p1);
            default:
                return 0;
        }
    }

    verificarVencedor(resultado){
        if (resultado == 0){
            this.fncES.mensagemCompleta("Não acho que quem ganhar ou quem perder, nem quem ganhar nem perder, vai ganhar ou perder. Todo mundo perdeu.");
        }else if(resultado == 1){
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " conseguiu vencer!!");
        }else if (resultado == -1){
            this.fncES.mensagemCompleta(this.p2.nomeCompleto() + " conseguiu vencer!!");
        }else {
            this.fncES.mensagemCompleta("====================================Fim====================================");
        }
    }

    ataque(){
        if (this.p1.forca != undefined && this.p2.vida != undefined){
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " atacou "+ this.p2.nomeCompleto());
            var dano = this.p1.atacar();
            this.p2.vida = this.p2.vida - dano;
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " causou "+dano+" de dano a"+this.p2.nomeCompleto()+" que ficou com "+this.p2.vida+ " pontos de vida");
            return this.verificaMortos(this.p1,this.p2);
        }else {
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " não pode atacar "+this.p2.nomeCompleto()+".");    
            this.fncES.mensagemCompleta("A batalha acabou.");
            return -2;
        }
    }
    fuga(){
        if (this.p1.velocidade != undefined && this.p2.velocidade != undefined){
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " tenta correr de "+ this.p2.nomeCompleto());
            var dano = this.p1.correr();
            var defesa = this.p2.correr();
            if (dano > defesa){
                this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " conseguiu correr de "+this.p2.nomeCompleto()+".");
                return 1;
            } else {
                this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " não conseguiu correr de "+this.p2.nomeCompleto()+".");                    
                return 0;
            }       
        }else {
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " não conseguiu correr de "+this.p2.nomeCompleto()+".");                
            return 0;
        }
    }
    conversa(){
        if (this.p1.inteligencia != undefined && this.p2.inteligencia != undefined){
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " tenta persuadir "+ this.p2.nomeCompleto());
            var dano = this.p1.persuadir();
            var defesa = this.p2.persuadir();

            if (dano > defesa){
                this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " conseguiu convercer "+this.p2.nomeCompleto()+".");    
                return 1;
            } else if (dano < defesa){
                this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " não conseguiu convercer "+this.p2.nomeCompleto()+"."); 
                return -1;
            }else {
                this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " não conseguiu convercer "+this.p2.nomeCompleto()+".");    
                return 0;
            }
                    
        }else {
            this.fncES.mensagemCompleta(this.p1.nomeCompleto() + " não conseguiu convercer "+this.p2.nomeCompleto()+".");    
            return 0;
        }
    }

    verificaMortos(){
        if (this.p1.vida != undefined && this.p2.vida != undefined){
            if (this.p1.vida <= 0){
                return -1
            }else if (this.p2.vida <= 0){
                return 1
            } else {
                return 0
            }
        }
    };
} 

class AcoesRPGPocoes{
    #p1
    #pocoes
    constructor(p1, pocoes){
        this.#p1 = p1;
        this.#pocoes = pocoes;
        this.fncES = new FuncoesES();      
    }

    get getPocoes(){
        var nomes =[];
        for (var i=0;i<this.#pocoes.length;i++){
            nomes[i] = this.#pocoes[i].nome;
        }
        return nomes;
    }

    pergOp(){
        var opcao = this.fncES.perguntaMenu(this.getPocoes);
        this.#pocoes[opcao].usar(this.#p1);
    }

}

const npc = new Entidades.Entidade("roberval",1,100,"o NPC");
//npc.falar("OLá")

const player1 = new Entidades.Player("Janilson",10,100,1000,10,10, "o guerreiro");

const pocao_cura = new Pocoes("Poção de cura Grande",1,"vida",20);
const pocao_forca = new Pocoes("Poção de força",1,"forca",10);

const fncJogo = new acoesRPGEntidadesBatalha(player1,npc);
const fncPocoes = new AcoesRPGPocoes(player1,[pocao_cura,pocao_forca]);

const espada1 = new Armas("Espada lendária",10,50,"espada","vida",10)

player1.equiparArma(espada1);
fncPocoes.pergOp();

player1.status();

player1.desequiparArma();
player1.status();
//inicia batalha entre player1 e npc
//var contBatalha = 0;
//while (contBatalha == 0){
//    contBatalha = fncJogo.pergOpAtaques();
//    if (contBatalha != 0){
//        fncJogo.verificarVencedor(contBatalha);
//    }
//}

//fncJogo.fncES.mensagemCompleta(npc.#tipoEntidade);
//player1.tipoEntidade = "o teste"





//console.log(npc.tipoEntidade);

//npc.tipoEntidade = "test"


