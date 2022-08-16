class Port {
    constructor(name) {
        this.name = name;
        this.ships = [];
    };

    addShip(ship) {
        this.ships.push(ship);
    };

    removeShip(ship) {
        const shipIndex = this.ships.indexOf(ship);
        if (shipIndex < 0) throw new Error('ship not in port')
        this.ships.splice(shipIndex, 1);
    };
};

module.exports = Port