const POSITION_TOP = 450;
const MILLISEC = 1000;
const TIME_APPEAR = 2000;

var GenerateRandomNumber = function (number, additionalNumber) {
    return Math.floor((Math.random() * number) + additionalNumber);
};

var GenerateRandomShape = function () {
    var num = Math.floor((Math.random() * 2) + 1);
    
    var result;
    
    switch (num) {
        case 1:
            result = '50';
            break;
        case 2:
            result = '0';
            break;
        default:
            break;
    }
    
    return result;
};

var GenerateRandomSize = function () {
    var num = Math.floor((Math.random() * 4) + 1);
    
    var result;
    
    switch (num) {
        case 1:
            result = '150';
            break;
        case 2:
            result = '100';
            break;
        case 3:
            result = '50';
            break;
        case 4:
            result = '20';
            break;
        default:
            break;
    }
    
    return result;
};

var colors = ['red', 'yellow', 'blue', 'brown', 'grey', 'green'];

var GenerateBox = function () {
    document.querySelector('.field').innerHTML = '<div class="box"></div>';
};

var GeneratePositionColor = function () {
    var box = document.querySelector('.box');
    
    box.style.top = GenerateRandomNumber(POSITION_TOP, 1) + 'px';
    box.style.left =  GenerateRandomNumber(window.innerWidth - 150, 1) + 'px';
    box.style.backgroundColor = colors[GenerateRandomNumber(colors.length, 0)];
    box.style.borderRadius = GenerateRandomShape() + '%';
    
    var randomSize = GenerateRandomSize();
    
    box.style.width = randomSize + 'px';
    box.style.height = randomSize + 'px';
};

GenerateBox();
GeneratePositionColor();

var box = document.querySelector('.box');

var start = '';

var DisplayBox = function () {
    box.style.display = 'block';
    start = new Date().getTime();
};

document.querySelector('#start-button').onclick = function () {
    DisplayBox();
    document.querySelector('#start-button').disabled = true;
    document.querySelector('#start-button').style.opacity = '0.5';
};

box.onclick = function () {
    box.style.display = 'none';
    
    var end = new Date().getTime();
    var scoreTime = document.querySelector('.time').textContent = (end - start) / MILLISEC + ' с';
    
    var scoreTable = document.querySelector('.score');

    scoreTable.innerHTML += '<tr><td>' + scoreTime + '</td></tr>';
    
    if (box.style.display === 'none') {
        setTimeout(DisplayBox, GenerateRandomNumber(TIME_APPEAR, 1));
    }
    
    GeneratePositionColor();
};



