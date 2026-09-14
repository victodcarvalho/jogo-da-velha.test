let tabuleiro = ["", "", "", "", "", "", "", "", ""];

let jogoFinalizado = false;

let vitorias = 0;
let empates = 0;
let derrotas = 0;

const casas = document.querySelectorAll(".casa");
const mensagem = document.getElementById("mensagem");

const placarVitorias = document.getElementById("vitorias");
const placarEmpates = document.getElementById("empates");
const placarDerrotas = document.getElementById("derrotas");

const botaoReiniciar = document.getElementById("reiniciar");

const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// ==========================
// CLIQUE NAS CASAS
// ==========================

casas.forEach(function(casa) {

    casa.addEventListener("click", function() {

        const indice = Number(casa.getAttribute("data-index"));

        // Não deixa jogar se a partida acabou
        if (jogoFinalizado) {
            return;
        }

        // Não deixa clicar em casa ocupada
        if (tabuleiro[indice] !== "") {
            return;
        }

        // Jogada do jogador
        tabuleiro[indice] = "X";

        atualizarTabuleiro();

        // Verifica se jogador ganhou
        let resultado = verificarResultado();

        if (resultado !== null) {
            finalizarJogo(resultado);
            return;
        }

        mensagem.textContent = "Computador pensando...";

        // Computador joga depois de 500ms
        setTimeout(function() {

            jogadaComputador();

        }, 500);

    });

});


// ==========================
// ATUALIZAR TABULEIRO
// ==========================

function atualizarTabuleiro() {

    casas.forEach(function(casa, indice) {

        casa.textContent = tabuleiro[indice];

        // Remove classes antigas
        casa.classList.remove("x");
        casa.classList.remove("o");

        // Adiciona classe do X
        if (tabuleiro[indice] === "X") {
            casa.classList.add("x");
        }

        // Adiciona classe do O
        if (tabuleiro[indice] === "O") {
            casa.classList.add("o");
        }

        // Desabilita casas ocupadas
        if (tabuleiro[indice] !== "") {
            casa.disabled = true;
        } else {
            casa.disabled = false;
        }

    });

}


// ==========================
// JOGADA DO COMPUTADOR
// ==========================

function jogadaComputador() {

    if (jogoFinalizado) {
        return;
    }

    // Procura uma jogada para ganhar
    let escolha = encontrarJogada("O");

    // Se não puder ganhar, tenta bloquear o jogador
    if (escolha === null) {
        escolha = encontrarJogada("X");
    }

    // Se o centro estiver livre, pega o centro
    if (escolha === null && tabuleiro[4] === "") {
        escolha = 4;
    }

    // Se ainda não escolheu, pega uma casa aleatória
    if (escolha === null) {

        let casasVazias = [];

        for (let i = 0; i < tabuleiro.length; i++) {

            if (tabuleiro[i] === "") {
                casasVazias.push(i);
            }

        }

        if (casasVazias.length > 0) {

            let numeroAleatorio =
                Math.floor(Math.random() * casasVazias.length);

            escolha = casasVazias[numeroAleatorio];

        }

    }

    // Coloca O
    if (escolha !== null) {

        tabuleiro[escolha] = "O";

    }

    atualizarTabuleiro();

    // Verifica resultado
    let resultado = verificarResultado();

    if (resultado !== null) {

        finalizarJogo(resultado);
        return;

    }

    mensagem.textContent = "Sua vez";

}


// ==========================
// ENCONTRAR JOGADA
// ==========================

function encontrarJogada(jogador) {

    for (let i = 0; i < combinacoes.length; i++) {

        let combinacao = combinacoes[i];

        let a = combinacao[0];
        let b = combinacao[1];
        let c = combinacao[2];

        // Jogador tem duas casas e uma vazia
        if (
            tabuleiro[a] === jogador &&
            tabuleiro[b] === jogador &&
            tabuleiro[c] === ""
        ) {
            return c;
        }

        if (
            tabuleiro[a] === jogador &&
            tabuleiro[c] === jogador &&
            tabuleiro[b] === ""
        ) {
            return b;
        }

        if (
            tabuleiro[b] === jogador &&
            tabuleiro[c] === jogador &&
            tabuleiro[a] === ""
        ) {
            return a;
        }

    }

    return null;

}


// ==========================
// VERIFICAR RESULTADO
// ==========================

function verificarResultado() {

    for (let i = 0; i < combinacoes.length; i++) {

        let combinacao = combinacoes[i];

        let a = combinacao[0];
        let b = combinacao[1];
        let c = combinacao[2];

        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {

            return tabuleiro[a];

        }

    }

    // Verifica empate
    let temCasaVazia = tabuleiro.includes("");

    if (!temCasaVazia) {
        return "EMPATE";
    }

    return null;

}


// ==========================
// FINALIZAR JOGO
// ==========================

function finalizarJogo(resultado) {

    jogoFinalizado = true;

    if (resultado === "X") {

        vitorias++;

        placarVitorias.textContent = vitorias;

        mensagem.textContent = "VOCÊ VENCEU";

    }

    else if (resultado === "O") {

        derrotas++;

        placarDerrotas.textContent = derrotas;

        mensagem.textContent = "O COMPUTADOR VENCEU";

    }

    else if (resultado === "EMPATE") {

        empates++;

        placarEmpates.textContent = empates;

        mensagem.textContent = "DEU VELHA";

    }

    atualizarTabuleiro();

}


// ==========================
// NOVA PARTIDA
// ==========================

botaoReiniciar.addEventListener("click", function() {

    tabuleiro = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    jogoFinalizado = false;

    mensagem.textContent = "Sua vez";

    atualizarTabuleiro();

});


// ==========================
// INICIAR JOGO
// ==========================

atualizarTabuleiro();