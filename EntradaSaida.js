import prompt from 'prompt-sync';

export default class FuncoesES{
    constructor(){
        this.input = prompt();
    }
    entrada(mensagem){        
        return this.input(mensagem);
    }
    mensagemSimples(mensagem){
        console.log(mensagem);
    }
    mensagemCompleta(mensagem){
        console.log("***********************************");
        console.log(mensagem)
        console.log("***********************************")
    }

    perguntaMenu(opcoes){
        console.log("***********************************");
        console.log("Voce deseja (escolha uma opção):");
        for (var i=0; i < opcoes.length;i++){
            console.log("Opção ("+i+")"+":"+opcoes[i]);
        }        
        console.log("***********************************");
        var opcao = Number(this.entrada());
        if ((opcao >=0) && (opcao < opcoes.length)){
            return opcao;
        }else{
            this.mensagemCompleta("Opção inválida, tente novamente");
            return this.perguntaMenu(opcoes);
        }
        
    }

    
}

