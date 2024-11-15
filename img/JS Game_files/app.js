let listaDeNumerosSorteados = [];
let nuemeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
       exibirTextoNaTela('h1', 'Acertou!');
       let palavraTentativas = tentativas > 1 ?  'tentativas' : 'tentativa';
       let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
       exibirTextoNaTela('p', mensagemTentativas);
       document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }else{
            exibirTextoNaTela('p','O número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumero(){
    let numeroEscolhido = parseInt(Math.random() * nuemeroLimite + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

if(quantidadeDeElementosDaLista == nuemeroLimite) {
   listaDeNumerosSorteados = [];
}

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
       return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disable', true)
}

