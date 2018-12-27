var startButton = document.querySelector('.start-button');
var field = document.querySelector('.field');
var figuresContainer = document.querySelector('.figures-container');

field.style.width = (window.innerWidth - 150) + 'px';

var figureValue = null;

var DisableStartButton = function () {
    startButton.classList.remove('start-button--hover-blue');
    startButton.style.opacity = 0.3;
    startButton.style.cursor = 'default';
    startButton.disabled = true;
};

var OnFiguresClick = function (evt) {
    figureValue = evt.target.value;
    
    if (figureValue !== undefined) {
        return figureValue;
    }
};

var OnStartClick = function (evt) {
    var windowWidth = window.innerWidth - 150;
    
    if (field.style.width > windowWidth + 'px' || field.style.width < windowWidth + 'px') {
        alert("Поле слишком маленькое / большое. Сейчас перезагрузится страница.");
        window.location.reload();
    }
    
    if (!figureValue) {
        alert("Незабудь выбрать фигуру");
    }
    else {
        DisableStartButton();
    
        var figure = document.createElement('div');
        figure.classList.add(figureValue);
        field.appendChild(figure);

        startButton.removeEventListener('click', OnStartClick);
    }
};

figuresContainer.addEventListener('click', OnFiguresClick);
startButton.addEventListener('click', OnStartClick);