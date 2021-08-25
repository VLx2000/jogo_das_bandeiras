let bandeira = window.document.getElementById('bandeira')
let p1 = window.document.getElementById('p1')
let p2 = window.document.getElementById('p2')
let cont = 1
let pontuacao = 0
let n_sorteado = []
var oba

class Pais {
    constructor(nome, bandeira) {
        this.nome = nome
        this.bandeira = bandeira;
        this.selecionado = 0;
    }
    set nome(nome) {
        this.nome = nome;
    }

    get nome() {
        return this.nome;
    }

    get bandeira() {
        return this.bandeira;
    }

    get selecionado() {
        return this.selecionado;
    }
    set selecionado(selecionado) {
        this.selecionado = selecionado;
    }
}

var paises = [new Pais("Brasil", "fotos/flags/br.png"), new Pais("Argentina", "fotos/flags/ar.png"), new Pais("Espanha", "fotos/flags/es.png"), new Pais("EUA", "fotos/flags/us.png")]

var bandeiras_dificil = []
var bandeiras_medio = []
var bandeiras_normal = []
var bandeiras_facil = ["fotos/flags/br.png", "fotos/flags/ar.png", "fotos/flags/es.png", "fotos/flags/us.png", "fotos/flags/it.png", "fotos/flags/de.png", "fotos/flags/uy.png", "fotos/flags/ca.png"]
var botoes = []

botoes[0] = window.document.getElementById('opcao1')
botoes[1] = window.document.getElementById('opcao2')
botoes[2] = window.document.getElementById('opcao3')
botoes[3] = window.document.getElementById('opcao4')

function limpar_usados() {
    for (let i = 0; i < 6; i++) {
        n_sorteado[i] = 0
    }
}

function selecionar(n_opcao) {

    if (oba === n_opcao) {
        pontuacao++
    }
    console.log(pontuacao, 'pontuacao')
    if (cont > 3) {
        window.document.getElementById('res').innerHTML = `${pontuacao} ponto(s)`
        botoes[0].style = 'display: none'
        botoes[1].style = 'display: none'
        botoes[2].style = 'display: none'
        botoes[3].style = 'display: none'
        p1.style = 'display: none'
        p2.style = 'display: none'
        recomecar.style = 'display: block'
        bandeira.src = 'fotos/globo.png'
        return 0
    }
    limpar_usados()
    oba = cria_opcoes()
    console.log(oba, 'oba')
    cont++
}

function ja_saiu(n) {
    if (n_sorteado[n]) {
        return 1
    }
    n_sorteado[n] = 1
    return 0
}
/*
function sorteio_pais() {
    let n = (Math.floor(Math.random() * facil.length))
    while (ja_saiu(n)){
        n = (Math.floor(Math.random() * facil.length))
    }
    return n
}
*/
function cria_opcoes() {
    let opcao = Math.floor(Math.random() * 4);
    //console.log(opcao, bandeiras_facil[opcao])
    let posicao_certa = Math.floor(Math.random() * 4);
    console.log(posicao_certa, 'posicao certa')
    botoes[posicao_certa].value = paises[opcao].nome
    bandeira.src = bandeiras_facil[opcao]
    let setadas = 1
    while (setadas < 4) {
        let posicao = Math.floor(Math.random() * 4);
        //console.log(posicao)
        if (posicao != posicao_certa && !ja_saiu(posicao)) {
            botoes[posicao].value = paises[Math.floor(Math.random() * 4)].nome
            setadas++
        }
    }
    return posicao_certa
}

function inicia_jogo(dificuldade) {
    //window.location.href = 'bandeira.html'
    limpar_usados()
    oba = cria_opcoes()
}

inicia_jogo(0)
