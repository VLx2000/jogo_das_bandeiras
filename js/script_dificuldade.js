window.document.getElementById('intro').style = 'box-shadow: 0px 0px 0px white; background-color: transparent;'

function set_dificuldade(level) {
    var cor
    // Armazenar
    if (level == 'Fácil')
        cor = `<font color="blue">${level}</font>`
    if (level == 'Normal')
        cor = `<font color="green">${level}</font>`
    if (level == 'Médio')
        cor = `<font color="orange">${level}</font>`
    if (level == 'Difícil')
        cor = `<font color="red">${level}</font>`
    if (level == 'MUITO Difícil')
        cor = `<font color="darkred">${level}</font>`
    if (level == 'TODAS')
        cor = `<font color="purple">${level}</font>`

    localStorage.setItem("level", level);
    localStorage.setItem("cor", cor);
    window.location.href = 'html/bandeira.html'
}