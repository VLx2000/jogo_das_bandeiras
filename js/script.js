let bandeira = window.document.getElementById('bandeira')
let p2 = window.document.getElementById('p2')
let cont = 1
let pontuacao = 0
let n_sorteado = []
let paises_escolhidos = []
let bandeiras_escolhidas = []
let aux_bandeiras
let string_caminho
let NUMERO_RODADAS
var resposta
var dificuldade
var dificuldade_cor

var bandeiras_MUITO_dificil = [
    "ag.png",  "bl.png",  "cg.png",  "gs.png",  "li.png",  "mo.png",  "nc.png",  "sb.png",  "tc.png",  
    "ai.png",  "bm.png",  "ck.png",  "fk.png",  "gu.png",  "lk.png",  "mp.png",  "nf.png",  "sc.png",    
    "bn.png",  "fo.png",  "hm.png",  "lr.png",  "mq.png",  "nr.png",  "sd.png",  "th.png",  "wf.png",
    "bq.png",  "cv.png",  "ga.png",  "ht.png",  "ls.png",  "nu.png",  "tj.png",  "vg.png",  "vi.png",
    "as.png",  "bs.png",  "cw.png",  "gd.png",  "io.png",  "lt.png",  "ms.png",  "nz.png",  "sh.png",    
    "aw.png",  "bt.png",  "cx.png",  "gf.png",  "je.png",  "md.png",  "mt.png",  "om.png",  "sj.png",    
    "ax.png",  "bv.png",  "dj.png",  "jo.png",  "me.png",  "mu.png",  "pf.png",  "sl.png",  "tm.png",  
    "bw.png",  "dm.png",  "kg.png",  "mf.png",  "mv.png",  "pg.png",  "to.png",  "ws.png",  "vu.png",
    "bd.png",  "bz.png",  "ee.png",  "kh.png",  "mg.png",  "mw.png",  "pm.png",  "tt.png",  "tl.png",
    "bf.png",  "cc.png",  "gm.png",  "ki.png",  "mh.png",  "pn.png",  "sr.png",  "tv.png",  "zm.png",
    "bi.png",  "cd.png",  "er.png",  "gp.png",  "km.png",  "ml.png",  "mz.png",  "re.png",  "ss.png",    
    "bj.png",  "cf.png",  "gq.png",  "kn.png",  "mn.png",  "na.png",  "rw.png",  "sz.png",  "tz.png",
    "tf.png",  "vc.png",  "tk.png"]

var bandeiras_dificil = [
    "ad.png", "ae.png", "af.png", "al.png", "am.png", "ao.png", "mr.png",
    "az.png", "ba.png", "cr.png", "eh.png", "fm.png", "aq.png", "my.png",
    "gh.png", "gn.png", "gt.png", "gw.png", "gy.png", "bb.png", "sg.png",
    "id.png", "im.png", "iq.png", "ir.png", "is.png", "gl.png", "sm.png",
    "ke.png", "kw.png", "ky.png", "kz.png", "la.png", "eh.png", "so.png",
    "lb.png", "lc.png", "lu.png", "ly.png", "mc.png", "et.png", "ug.png",
    "mk.png", "mm.png", "ne.png", "ni.png", "np.png", "gg.png", "uz.png",
    "pa.png", "pk.png", "ps.png", "pw.png", "sn.png", "fj.png", "va.png",
    "st.png", "sv.png", "sx.png", "sy.png", "td.png", "gi.png", "tg.png", 
    "tn.png", "tw.png", "ye.png", "zw.png"]

var bandeiras_medio = [
    "af.png", "au.png", "bg.png", "by.png", "ci.png",
    "cy.png", "do.png", "dz.png", "ge.png", "hk.png", 
    "hu.png", "in.png", "lt.png", "lv.png", "ma.png", 
    "ng.png", "nl.png", "no.png", "nz.png", "ph.png", 
    "pr.png", "qa.png", "ro.png", "rs.png", "sa.png", 
    "si.png", "sk.png", "ua.png", "xk.png", "gt.png"]

var bandeiras_normal = [
    "at.png", "bh.png", "bo.png", "cm.png", "co.png",
    "cu.png", "cz.png", "dk.png", "ec.png", "eg.png",
    "fi.png", "gr.png", "hn.png", "hr.png", "hu.png",
    "ie.png", "il.png", "jm.png", "nl.png", "no.png",
    "pe.png", "pl.png", "py.png", "tr.png", "vn.png"]

var bandeiras_facil = [
    "ar.png", "be.png", "br.png", "ca.png", "ch.png",
    "cl.png", "cn.png", "de.png", "es.png", "fr.png", 
    "gb.png", "it.png", "jp.png", "kp.png", "kr.png", 
    "mx.png", "pt.png", "ru.png", "se.png", "us.png",
    "uy.png", "ve.png", "yt.png", "za.png"]

var todas_bandeiras = bandeiras_facil.concat(bandeiras_normal, bandeiras_medio, bandeiras_dificil, bandeiras_MUITO_dificil)

var botoes = [  window.document.getElementById('opcao1'),
                window.document.getElementById('opcao2'),
                window.document.getElementById('opcao3'),
                window.document.getElementById('opcao4')]


function inicia_jogo() {
    // Obter
    dificuldade = localStorage.getItem("level");
    dificuldade_cor = localStorage.getItem("cor");
    getDificuldade()
    
    window.document.getElementById('res').innerHTML = `<strong><font size=10px>${cont}</font></strong>/<font size=3px>${NUMERO_RODADAS}</font>`
    window.document.getElementById('dificuldade').innerHTML = `<strong>${dificuldade_cor}</strong>`
    window.document.getElementById('acertos').innerHTML = `Acertos: ${pontuacao}`
    window.document.getElementById('erros').innerHTML = `Erros: ${cont - pontuacao - 1}`
    resposta = cria_opcoes()
}

function cria_opcoes() {

    limpar_paises()
    let posicao_certa
    let colocou = false
    let opcao = Math.floor(Math.random() * aux_bandeiras.length);
    while (ja_saiu_bandeira(opcao)) {
        opcao = Math.floor(Math.random() * aux_bandeiras.length);
    }

    paises_escolhidos.push(aux_bandeiras[opcao])

    posicao_certa = Math.floor(Math.random() * 4);
    n_sorteado[posicao_certa] = 1

    let regionNames = new Intl.DisplayNames(['pt-BR'], { type: 'region' });  //o milagre acontece aqui :o

    botoes[posicao_certa].value = regionNames.of(aux_bandeiras[opcao].toUpperCase().replace('.PNG', ''))
    bandeira.src = '../imagens/' + string_caminho + aux_bandeiras[opcao]

    let setadas = 1
    while (setadas < 4) {
        let posicao = Math.floor(Math.random() * 4);
        if (!ja_saiu_posicao(posicao)) {
            while (!colocou) {
                let pais_escolhido = aux_bandeiras[Math.floor(Math.random() * aux_bandeiras.length)]
                if (!ja_saiu_pais(pais_escolhido)) {
                    botoes[posicao].value = regionNames.of(pais_escolhido.toUpperCase().replace('.PNG', ''))
                    setadas++
                    colocou = true
                }
            }
            colocou = false
        }
    }
    return posicao_certa
}

function selecionar(n_opcao) {

    cont++
    if (resposta === n_opcao) {
        pontuacao++
    }
    window.document.getElementById('res').innerHTML = `<strong><font size=10px>${cont}</font></strong>/<font size=3px>${NUMERO_RODADAS}</font>`
    window.document.getElementById('acertos').innerHTML = `Acertos: ${pontuacao}`
    window.document.getElementById('erros').innerHTML = `Erros: ${cont - pontuacao - 1}`
    jogo()
}

function jogo() {
    if (cont > NUMERO_RODADAS) {
        botoes[0].style = 'display: none'
        botoes[1].style = 'display: none'
        botoes[2].style = 'display: none'
        botoes[3].style = 'display: none'
        p2.style = 'display: block;'
        p2.innerHTML = `<strong>FIM DE JOGO!</strong><br>Você acertou <strong>${pontuacao} de ${NUMERO_RODADAS}</strong> bandeiras <br> na dificuldade <strong>${dificuldade_cor}</strong>`
        recomecar.style = 'display: block;'
        bandeira.src = '../imagens/mapa.png'
        bandeira.style = 'box-shadow: 0px 0px 0px white; background-color: transparent; margin: auto;'
        window.document.getElementById('res').style = 'display: none'
        window.document.getElementById('dificuldade').style = 'display: none'
        window.document.getElementById('p4').style = 'display: none'
        return 0
    }
    limpar_usados()
    resposta = cria_opcoes()
}

function limpar_usados() {
    for (let i = 0; i < n_sorteado.length; i++) {
        n_sorteado[i] = 0
    }
}

function limpar_paises() {
    for (let i = 0; i < paises_escolhidos.length; i++) {
        paises_escolhidos[i] = ''
    }
}

function ja_saiu_posicao(posicao) {
    if (n_sorteado[posicao]) {
        return true
    }
    n_sorteado[posicao] = 1
    return false
}

function ja_saiu_pais(pais) {
    for (let i = 0; i < paises_escolhidos.length; i++) {
        if (paises_escolhidos[i] == pais) {
            return true
        }
    }
    paises_escolhidos.push(pais)
    return false
}

function ja_saiu_bandeira(bandeira) {
    for (let i = 0; i < bandeiras_escolhidas.length; i++) {
        if (bandeiras_escolhidas[i] == bandeira) {
            return true
        }
    }
    bandeiras_escolhidas.push(bandeira)
    return false
}

function getDificuldade() {
    if (dificuldade == 'Fácil'){
        string_caminho = 'facil/'
        aux_bandeiras = bandeiras_facil
        NUMERO_RODADAS = 10
    }
    else if (dificuldade == 'Normal'){
        string_caminho = 'normal/'
        aux_bandeiras = bandeiras_normal
        NUMERO_RODADAS = 10
    }
    else if (dificuldade == 'Médio'){
        string_caminho = 'medio/'
        aux_bandeiras = bandeiras_medio
        NUMERO_RODADAS = 15
    }
    else if (dificuldade == 'Difícil'){
        string_caminho = 'dificil/'
        aux_bandeiras = bandeiras_dificil
        NUMERO_RODADAS = 15
    }
    else if (dificuldade == 'MUITO Difícil'){
        string_caminho = 'muito_dificil/'
        aux_bandeiras = bandeiras_MUITO_dificil
        NUMERO_RODADAS = 20
    }
    else {
        string_caminho = 'todas/'
        aux_bandeiras = todas_bandeiras
        NUMERO_RODADAS = 20
    }
}

inicia_jogo()