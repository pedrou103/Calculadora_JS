var estado; //momento em que a calculadora está
var operador1;
var operador2;
var result;
var operacao;
var sinal;

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
    
    multiplicaçao : function() {
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
                document.getElementById("display2").innerHTML = operador1 + sinal + operador2;
                document.getElementById("display").innerText = result;
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
