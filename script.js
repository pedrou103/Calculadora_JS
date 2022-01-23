window.addEventListener("load", exibir);

var estado; //momento em que a calculadora está
var operador1;
var operador2;
var result;
var operacao;
var sinal;
var expressao;

function tecladoEvent(e) {
    if (e.keyCode == 13 || e.keyCode == 187) {
        calculadora.igual();
    }
}

let calculadora = { //objeto calculadora
    numeros : new Array(), //array

    inicializacao : function() {
        estado = "inicializado";
        this.display();
    },

    adicao : function() {
        operacao = 'adicao';
        estado = 'operador2';
        this.numeros = [];
    },
    
    subtracao : function() {
        operacao = 'subtracao';
        estado = 'operador2';
        this.numeros = [];
    },

    divisao : function() {
        operacao = 'divisao';
        estado = 'operador2';
        this.numeros = [];
    },
    
    multiplicacao : function() {
        operacao = 'multiplicacao';
        estado = 'operador2';
        this.numeros = [];
    },
    
    ac : function () {
        calculadora.inicializacao();
        this.numeros = [];
        document.getElementById("display2").innerText = '';
    },

    del : function () {
        this.numeros.pop(); //pegar o último numero do array
        this.proximonumero();
        this.display;
    },

    igual : function () {
        switch(operacao){
            case 'adicao':
                result = operador1 + operador2;
                estado = 'result';
                this.display();
                break;
            case 'subtracao':
                result = operador1 - operador2;
                estado = 'result'
                this.display();
                break;
            case 'divisao':
                result = operador1 / operador2;
                estado = 'result';
                this.display();
                break;
            case 'multiplicacao':
                result = operador1 * operador2;
                estado = 'result';
                this.display();
                break;
        }
    },

    display : function() {
        switch (estado) {
            case 'inicializado':
                document.getElementById("display").innerText = 'Display';
                estado = 'operador1';
                break;
            case 'operador1':
                document.getElementById("display").innerText = operador1;
                break;
            case 'operador2':
                switch(operacao) {
                    case 'adicao':
                        sinal = ' + ';
                        break;
                    case 'subtracao':
                        sinal = ' - ';
                        break;
                    case 'divisao':
                        sinal = ' / ';
                        break;
                    case 'multiplicacao':
                        sinal = ' * ';
                        break;
                }
                document.getElementById("display2").innerHTML = operador1 + sinal;
                document.getElementById("display").innerText = operador2;
                break;
            case 'result':
                expressao = document.getElementById("display2").innerHTML = operador1 + sinal + operador2 + ' =';
                document.getElementById("display").innerText = result;
                historico();
                estado = 'operador1';
                break;
        }
    },

    proximonumero : function (digito) {
        switch (estado) {
            case 'operador1':
                this.numeros.push(digito); //push -> function q coloca o valor digitado no final do array
                operador1 = parseFloat(this.numeros.join(''));
                this.display();
                break;
            case 'operador2':
                this.numeros.push(digito);
                operador2 = parseFloat(this.numeros.join(''));
                this.display();
                break;
        }
    }
}

function historico() {
    console.log(` aaaaaaaaaaaa ${expressao}`)
    historicoObj = {
        expressao: expressao, resultado: result
    };

    if (localStorage.getItem('calculadora') == null) {
        let calculo = [];
        calculo.push(historicoObj);
        localStorage.setItem('calculadora', JSON.stringify(calculo));
    } else {
        let calculo = JSON.parse(localStorage.getItem('calculadora'));
        calculo.push(historicoObj);
        localStorage.setItem('calculadora', JSON.stringify(calculo));
        console.table(calculo)
    }
    exibir();
}

function exibir() {
    let historico = JSON.parse(localStorage.getItem('calculadora'));
    let exibir = document.getElementById('exibir');
    exibir.innerText = 'Histórico:';
    
    for (let i = 0; i <= historico.length; i++) {
        console.log(historico[2].expressao)
        let expressao = historico[i].expressao;
        let result = historico[i].resultado;
        exibir.innerHTML += `<li>${expressao}</li>
                                <li>${result}</li>`
    }
}

function limpar() {
    localStorage.clear();
    exibir();
}

function alterarTema() {
    if (document.getElementById("teste").classList.contains('escuro') === true) {
        document.getElementById("teste").classList.remove('escuro');
        var num = document.querySelectorAll("#num"); //retorna uma NodeList
        var numArray = Array.from(num); //o From transforma a nodelist em um array
        numArray.forEach((index) => {
            index.classList.remove('escuro2');
            console.log(index);
        });
    } else {
        document.getElementById("teste").classList.add('escuro');
        var num = document.querySelectorAll("#num");
        var numArray = Array.from(num);
        numArray.forEach((index) => {
            index.classList.add('escuro2');
            console.log(index);
        });
    }

}
