(function () {
    var colors = [
        '#263345',
        '#ff7800',
        '#2b81ee',
        '#00c3f3',
        '#b31b42',
        '#47ffaf',
        '#e3e834',
        '#ffa246',
        '#e834b1',
        '#3a55ff'
    ];
    
    var figures = [
        'box',
        'circle',
        'heart'
    ];
    
    window.data = {
        GetColor: function () {
            var randomColor = window.randomizer.GenerateRandomNumber(0, colors.length);
            
            return colors[randomColor];
        },
        GetFigure: function () {
            var randomFigure = window.randomizer.GenerateRandomNumber(0, figures.length);
            
            return figures[randomFigure];
        }
    };
})();