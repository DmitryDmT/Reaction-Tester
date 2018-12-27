(function () {
    var startButton = document.querySelector('.start-button');
    var timeHolder = document.querySelector('.time');
    var field = document.querySelector('.field');
    var figuresContainer = document.querySelector('.figures-container');
    var figureValue = null;

    field.style.width = (window.innerWidth - 150) + 'px';

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
        
        figuresContainer.removeEventListener('click', OnFiguresClick);
    };

    var OnStartClick = function (evt) {
        var windowWidth = window.innerWidth - 150;
        var fieldHeight = field.clientHeight;
        var fieldWidth = field.clientWidth;
        
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
            
            var figureWidth = figure.clientWidth;
            var figureHeight = figure.clientHeight;
            
            figure.style.top = window.randomizer.GenerateRandomNumber(1, fieldHeight - figureHeight) + 'px';
            figure.style.left = window.randomizer.GenerateRandomNumber(1, fieldWidth - figureWidth) + 'px';
            
            var startTime = new Date().getTime();

            field.addEventListener('click', function (evt) {
                var endTime = new Date().getTime();
                var difference = (endTime - startTime) / 1000;
                
                timeHolder.textContent = difference;
                
                
            });

            startButton.removeEventListener('click', OnStartClick);
        }
    };

    figuresContainer.addEventListener('click', OnFiguresClick);
    startButton.addEventListener('click', OnStartClick);
})();