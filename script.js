var listaPalavras = []
var mensagem = window.document.getElementById('mensagem')//variavel global
var palavraAtual = '' // Variável global para adicionar a palavra atual
var linhas = []; // Array para armazenar as referências das divs
var vida = 6
var vidaChute = 3 // Inicializei a variável vidaChute
var placar = window.document.getElementById('placar')///variavel global
var placar1 = 0//variavel global
var placar2 = 0//variavel global
var acertos = 0//variavel global
var localBarras = window.document.getElementById('containerBarras')//variavel global
var jogador1 = 'jogador1'
var jogador2 = 'jogador2'


function isPalavra(p) {
    if(isNaN(p)){
        // Se não é um número (string)
        return true;
    }else{
        // Se é um número (number)
        return false;
    }
}

function adicionarPalavra(p){
    if(isPalavra(p)){
        // Se é verdade, ou seja, se é uma palavra, adicionar na lista.
        listaPalavras.push(p)
    }else{
        alert('Por favor, insira uma palavra válida!')
    }
}


    //ao menos que não esteja 0 a 0

function trocaJogadores(){

    var tempJogador = jogador1//variavel temporaria é jogador 1
    jogador1 = jogador2//jogador 1 é jogador 2 
    jogador2 = tempJogador//jogador 2 é jogador 1, ja que a variavel temporaria se tornou o jogador 1 

    var tempPlacar = placar1//variavel temporaria é placar 1
    placar1 = placar2//placar 1 é placar 2
    placar2 = tempPlacar//placar 2 é placar 1, ja que a variavel temporaria se tornou o placar 1


}


function iniciar(){
    
    var palavra = window.prompt(`Digite uma palavra para o ${jogador2} tentar advinhar:`)
    adicionarPalavra(palavra)
    palavraAtual = listaPalavras[listaPalavras.length - 1]// Pegar a última palavra do Array (a que vai ser utilizada no jogo)
    var comprimento = palavraAtual.length// Quantas letras tem a palavra
    mensagem.innerHTML = `A palavra escolhida tem ${comprimento} letras.`
    localBarras.innerHTML = ''// Zerar a Div onde vão ter as barrinhas que representam as letras da palavra

    linhas = []
    acertos = 0
    vida = 6
    vidaChute = 3
//se repetiu para sempre reiniciar as vidas e acertos
    for(var c = 0; c < comprimento; c++){
        
        var barra = window.document.createElement('div')
        barra.setAttribute('id', 'barras')
        barra.innerHTML = `_`
        localBarras.appendChild(barra)
        linhas.push(barra)//Armazenar a referência da div no array
    }
}

function conferirLetra(){
    var letra = window.document.getElementById('letra').value

    if(listaPalavras.length === 0){
        //Se a lista de palavras está vazia
        alert('Nenhuma palavra foi adicionada ainda.')
        return
    }

    if(palavraAtual.includes(letra)){
        //Se tiver a letra

        var posicoes = []// Array das posições em que estão as letras acertadas

        for(var p = 0; p < palavraAtual.length; p++){
            //Até encontrar a posição da letra
            if (palavraAtual[p] === letra) {
                //Se a letra dessa posição for igual à letra que tentou adivinhar
                posicoes.push(p); // O array posicoes vai receber a posição quando a letra na posição "p" for igual à letra
                
            }
        }

        for(var pos of posicoes){
            //Aqui, pos será cada valor do array posicoes.
          if(linhas[pos].innerHTML === `_`){
            //so se tiver a barra, ja que se tiver uma letra não vai rodar esse loop
            linhas[pos].innerHTML = `${letra}`
            acertos++}
        }
    
    if(acertos === palavraAtual.length){
        //acertou todas as letras
        mensagem.innerHTML += `<br>Você ja descobriu a palavra ${palavraAtual}. O ${jogador2} venceu essa rodada!`
        placar2++
        placar.innerHTML = `${jogador1}: ${placar1} | ${jogador2}: ${placar2}`
        localBarras.innerHTML = ``
        trocaJogadores()//acabou a rodada
    }else{
        mensagem.innerHTML += `<br>Você descobriu a letra '${letra}' na palavra, parabéns!`
    }
    }else{
        vida--
        mensagem.innerHTML += `<br>A letra '${letra}' não está na palavra, você perdeu uma vida e tem ${vida} vidas restantes.`
        if(vida <= 0 ){

            alert(`Suas vidas acabaram. O vencedor dessa partida é o ${jogador1}!`)
            placar1++
            placar.innerHTML = `${jogador1}: ${placar1} | ${jogador2}: ${placar2}`
            mensagem.innerHTML = ''
            localBarras.innerHTML = `A Palvra a ser descoberta era '${palavraAtual}'.`
            trocaJogadores()//acabou a rodada
            
        }
    }
}

function advinharPalavra(){
    var resposta = window.prompt(`${jogador2}, digite a palavra que você acha que o ${jogador1} escolheu para você advinhar:`)

    if(isPalavra(resposta)){
        //se resposta é uma palavra
        if(vida > 0 && vidaChute > 0 && resposta === palavraAtual){
            mensagem.innerHTML = `PARABÉNS, ${jogador2} VENCEU. A PALAVRA ERA '${palavraAtual}'!`
            placar2++
            placar.innerHTML = `${jogador1}: ${placar1} | ${jogador2}: ${placar2}`
            trocaJogadores()//acabou a rodada
        }else{
            vidaChute--
            if(vidaChute <= 0 || vida <= 0){
                alert(`Suas vidas acabaram. O vencedor dessa partida é o ${jogador1}!`)
                placar1++
                localBarras.innerHTML = `A Palvra a ser descoberta era '${palavraAtual}'.`
                mensagem.innerHTML = ''
                placar.innerHTML = `${jogador1}: ${placar1} | ${jogador2}: ${placar2}`
                trocaJogadores()//acabou a rodada
            }else{
                mensagem.innerHTML += `<br>Palavra incorreta, a resposta não era ${resposta}! Você perdeu uma chance de adivinhar. Chances restantes: ${vidaChute}`
            }
        }
    }else{
        //se resposta não é uma palavra
        alert('Digite uma palavra!')
    }
}



