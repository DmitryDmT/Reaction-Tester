(function () {
    window.randomizer = {
        GenerateRandomNumber: function (min, max) {
            var random = Math.floor((Math.random * max) + min);
            
            if (random > max) {
                random = random - min;
            }
            
            return random;
        }
    };
})();