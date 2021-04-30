(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        setGame: function (game) {
            this.game = game;
        },
        play: function () {
            var self = this;
            var x = utils.randomInt(0, 9);
            var y = utils.randomInt(0, 9);
                self.game.fire(this, x, y, function (hasSucced) {
                    self.tries[x][y] = hasSucced;
                    utils.sounds['fire'].play();
                });
        },
        areShipsOk: function (callback) {
            var self = this;

            this.fleet.forEach(function (ship) {
                var health; // Vie du bateau (voir shipfactory.js)
                var x = 9;
                var y = 9;
                var done = false;
                var coordX;
                var coordY;
                while (!done) {
                    health = ship.getLife();
                    if (utils.randomInt(0, 1) === 1) // vertical
                    {
                        y = 10 - health;
                        coordX = utils.randomInt(0, x);
                        coordY = utils.randomInt(0, y);
                        if (self.grid[coordY][coordX] === 0) {
                            health--;
                            var ligne = coordY;
                            while (health > 0) {
                                if (self.grid[ligne + 1][coordX] !== 0) {
                                    break;
                                }
                                health--;
                                ligne++;
                            }

                            if (health === 0) {
                                // Confirmation placement du bateau
                                for (var i = ship.getLife(); i > 0; i--) {
                                    self.grid[coordY + i - 1][coordX] = ship.getId();
                                    done = true;
                                }
                            }
                        }
                    }
                    else // horizontal
                    {
                        x = 10 - health;
                        coordX = utils.randomInt(0, x);
                        coordY = utils.randomInt(0, y);
                        if (self.grid[coordY][coordX] === 0) {
                            health--;
                            var col = coordX;
                            while (health > 0) {
                                if (self.grid[coordY][col + 1] !== 0) {
                                    break;
                                }
                                health--;
                                col++;
                            }

                            if (health === 0) {
                                //Confirmation placement du bateau
                                for (var i = ship.getLife(); i > 0; i--) {
                                    self.grid[coordY][coordX + i - 1] = ship.getId();
                                    done = true;
                                }
                            }
                        }
                    }
                }
                console.log(self.grid);
            }, this);

            setTimeout(function () {
                callback();
            }, 500);
        }
    });

    global.computer = computer;

}(this));