const Ship = require('../Ship');
const Port  = require('../Port');
const Itinerary = require('../Itinerary');

describe('Ship', () => {
    let ship;
    let port1;
    let port2;
    let itinerary;

    beforeEach(() => {
        port1 = new Port('Dover');
        port2 = new Port ('Calais');    
        itinerary = new Itinerary([port1, port2]);
        ship = new Ship(itinerary);
    });

    it('can be instantiated', () => {
        expect(ship).toBeInstanceOf(Object);
    });

    it('has previous port initiliased as null', () => {
        expect(ship.previousPort).toEqual(null);
    });

    it('has current port initialised as port1', () => {
        expect(ship.currentPort).toEqual(port1);
    });
    
    it('can set sail', () => {
        expect(port1.ships).toContain(ship);

        ship.setSail();

        expect(ship.currentPort).toBeFalsy();
        expect(port1.ships).not.toContain(ship);
    });

    it('setting sail sets the previousPort to the currentPort', () => {
        ship.setSail();
        expect(ship.previousPort).toEqual(port1);
    });

    it('can dock at different ports', () => {
        ship.setSail();
        ship.dock();

        expect(ship.currentPort).toEqual(port2);
        expect(port2.ships).toContain(ship);
    });

    it('cannot sail further than its itinerary', () => {
        ship.setSail();
        ship.dock();

        expect(() => ship.setSail()).toThrowError('End of itinerary reached');
    });

    it('gets added to port on instantiation', () => {
        expect(port1.ships).toContain(ship);
    });
});