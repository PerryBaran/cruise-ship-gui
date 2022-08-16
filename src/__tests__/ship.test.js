const Ship = require('../Ship');
const Port  = require('../Port');
const Itinerary = require('../Itinerary');

describe('Ship', () => {
    it('can be instantiated', () => {
        const port1 = new Port('Dover');
        const itinerary = new Itinerary([port1]);
        const ship = new Ship(itinerary);
       expect(ship).toBeInstanceOf(Object) 
    });

    it('has previous port initiliased as null', () => {
        const port1 = new Port('Dover');
        const itinerary = new Itinerary([port1]);
        const ship = new Ship(itinerary);
        expect(ship.previousPort).toEqual(null);
    });

    it('has current port initialised as port1', () => {
        const port1 = new Port('Dover');
        const itinerary = new Itinerary([port1]);
        const ship = new Ship(itinerary);
        expect(ship.currentPort).toEqual(port1);
    });
    
    it('can set sail', () => {
        const port1 = new Port('Dover');
        const port2 = new Port ('Calais');    
        const itinerary = new Itinerary([port1, port2]);
        const ship = new Ship(itinerary);

        ship.setSail();

        expect(ship.currentPort).toBeFalsy();
    });

    it('can set sail, setting the previousPort to the currentPort', () => {
        const port1 = new Port('Dover');
        const port2 = new Port ('Calais');    
        const itinerary = new Itinerary([port1, port2]);
        const ship = new Ship(itinerary);

        ship.setSail();

        expect(ship.previousPort).toEqual(port1);
    });

    it('can dock at a new port', () => {
        const port1 = new Port('Dover');
        const port2 = new Port ('Calais');    
        const itinerary = new Itinerary([port1, port2]);
        const ship = new Ship(itinerary);

        ship.setSail();
        ship.dock();

        expect(ship.currentPort).toEqual(port2)  
    });

    it('cannot sail further than its itinerary', () => {
        const port1 = new Port('Dover');
        const port2 = new Port ('Calais');    
        const itinerary = new Itinerary([port1, port2]);
        const ship = new Ship(itinerary);

        ship.setSail();
        ship.dock();

        expect(() => ship.setSail()).toThrowError('End of itinerary reached');
    });
});