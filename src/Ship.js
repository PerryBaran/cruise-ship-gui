class Ship{
    constructor(itinerary) {
        this.previousPort = null;
        this.currentPort = itinerary.ports[0];
        this.itinerary = itinerary;
        this.currentPort.addShip(this);
    };

    setSail() {
        const ports = this.itinerary.ports;
        const currentPortIndex = ports.indexOf(this.currentPort);

        if (currentPortIndex === (ports.length - 1)) throw new Error('End of itinerary reached');

        this.previousPort = this.currentPort;
        this.currentPort = null;
        this.previousPort.removeShip(this);
    };

    dock() {
        const ports = this.itinerary.ports;
        const nextPortIndex = ports.indexOf(this.previousPort) + 1;

        this.currentPort = ports[nextPortIndex];
        this.currentPort.addShip(this);
    };
};

module.exports = Ship;