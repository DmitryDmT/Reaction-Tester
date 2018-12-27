(function () {
    var clickStartSound = document.querySelector('.click-start-sound');
    var clickFigureSound = document.querySelector('.click-figure-sound');
    var clickChoiceSound = document.querySelector('.click-choice-sound');
    
    var startButton = document.querySelector('.start-button');
    var restartButton = document.querySelector('.restart-button');
    var timeHolder = document.querySelector('.time');
    var field = document.querySelector('.field');
    var scoreTable = document.querySelector('.score-table');
    var figuresContainer = document.querySelector('.figures-container');
    
    var figureValue = null;
    var randomFigure = null;
    
    var startTime;
    var difference;
    
    var scoreList = [];

    field.style.width = (window.innerWidth - 150) + 'px';

    var SetActiveButton = function (buttonElement, buttonType, boolType) {
        if (boolType === false) {
            buttonElement.classList.remove(`${buttonType}-button--hover`);
            buttonElement.style.opacity = 0.3;
            buttonElement.style.cursor = 'default';
            buttonElement.disabled = true;
        }
        else {
            buttonElement.classList.add(`${buttonType}-button--hover`);
            buttonElement.style.opacity = 1;
            buttonElement.style.cursor = 'pointer';
            buttonElement.disabled = false;
        }
    };
    
    SetActiveButton(restartButton, 'restart', false);
    
    var DisplayFigureOnRandomPos = function (figureElement) {
        figureElement.style.top = window.randomizer.GenerateRandomNumber(1, field.clientHeight - figureElement.clientHeight) + 'px';
        figureElement.style.left = window.randomizer.GenerateRandomNumber(1, field.clientWidth - figureElement.clientWidth) + 'px';
        figureElement.classList.remove('hidden');
        
        if (figureElement.classList.contains('heart')) {
            figureElement.style.background = 'none'; // todo разобраться в ошибке наложения background color
        }
        else {
            figureElement.style.backgroundColor = window.data.GetColor();
        }
        
        startTime = new Date().getTime();
    };
    

    var OnFiguresClick = function (evt) {
        figureValue = evt.target.value;

        if (figureValue !== undefined) {
            clickChoiceSound.play();
        }
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
            alert("Не забудь выбрать фигуру");
        }
        else {
            SetActiveButton(startButton, 'start', false);
            SetActiveButton(restartButton, 'restart', true);

            var figure = document.createElement('div');
            
            if (figureValue !== 'all') {
                figure.classList.add(figureValue);
            }
            else {
                randomFigure = window.data.GetFigure();
                figure.classList.add(randomFigure);
            }
            
            field.appendChild(figure);
            DisplayFigureOnRandomPos(figure);

            figure.addEventListener('click', function (evt) {
                clickFigureSound.play();
                
                var endTime = new Date().getTime();
                difference = (endTime - startTime) / 1000;
                timeHolder.textContent = difference;
                
                scoreList.push(difference);
                scoreList.sort(function (a, b) {
                    return a - b;
                });
                scoreTable.innerHTML += '<tr class="score-table__score-row"><td class="score-table__score">' + difference + '</td></tr>';
                
                figure.classList.add('hidden');
                
                if (randomFigure !== null) {
                    figure.classList.remove(randomFigure);
                    randomFigure = window.data.GetFigure();
                    figure.classList.add(randomFigure);
                }
                
                setTimeout(DisplayFigureOnRandomPos, 1000, figure);
            });
            
            restartButton.addEventListener('click', function () {
                clickStartSound.play();
                alert('Лучшее время: ' + scoreList[0]);
                window.location.reload();
            });

            startButton.removeEventListener('click', OnStartClick);
        }
    };

    figuresContainer.addEventListener('click', OnFiguresClick);
    startButton.addEventListener('click', OnStartClick);
})();