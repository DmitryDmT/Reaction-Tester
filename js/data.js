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
    
    window.data = {
        GetColor: function () {
            var random = window.randomizer.GenerateRandomNumber(0, colors.length);
            
            return colors[random];
        }
    };
})();