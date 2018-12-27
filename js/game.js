(function () {
    var clickStartSound = document.querySelector('.click-start-sound');
    var clickFigureSound = document.querySelector('.click-figure-sound');
    var clickChoiceSound = document.querySelector('.click-choice-sound');
    
    var startButton = document.querySelector('.start-button');
    var timeHolder = document.querySelector('.time');
    var field = document.querySelector('.field');
    var figuresContainer = document.querySelector('.figures-container');
    var figureValue = null;
    
    var startTime;

    field.style.width = (window.innerWidth - 150) + 'px';

    var DisableStartButton = function () {
        startButton.classList.remove('start-button--hover-blue');
        startButton.style.opacity = 0.3;
        startButton.style.cursor = 'default';
        startButton.disabled = true;
    };
    
    var DisplayFigureOnRandomPos = function (figureElement) {
        figureElement.style.top = window.randomizer.GenerateRandomNumber(1, field.clientHeight - figureElement.clientHeight) + 'px';
        figureElement.style.left = window.randomizer.GenerateRandomNumber(1, field.clientWidth - figureElement.clientWidth) + 'px';
        figureElement.classList.remove('hidden');
        
        if (!figureElement.classList.contains('heart')) {
            figureElement.style.backgroundColor = window.data.GetColor();
        }
        
        startTime = new Date().getTime();
    };

    var OnFiguresClick = function (evt) {
        figureValue = evt.target.value;

        if (figureValue !== undefined) {
            clickChoiceSound.play();
            return figureValue;
        }
        
        figuresContainer.removeEventListener('click', OnFiguresClick);
    };

    var OnStartClick = function (evt) {
        clickStartSound.play();
        
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
            
            DisplayFigureOnRandomPos(figure);

            figure.addEventListener('click', function (evt) {
                clickFigureSound.play();
                
                var endTime = new Date().getTime();
                var difference = (endTime - startTime) / 1000;
                timeHolder.textContent = difference;
                
                figure.classList.add('hidden');
                
                setTimeout(DisplayFigureOnRandomPos, 1000, figure);
            });

            startButton.removeEventListener('click', OnStartClick);
        }
    };

    figuresContainer.addEventListener('click', OnFiguresClick);
    startButton.addEventListener('click', OnStartClick);
})();