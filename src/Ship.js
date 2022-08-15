class Ship{
    constructor(startingPort) {
        this.currentPort = startingPort
    };

    setSail() {
        this.currentPort = false;
    };

    dock(port) {
        this.currentPort = port
    };
};

module.exports = { Ship }