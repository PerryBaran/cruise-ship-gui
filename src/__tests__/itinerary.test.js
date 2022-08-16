const Itinerary = require('../Itinerary');
const Port  = require('../Port');

describe('Itinerary', () => {
    it('can be instantiated', () => {
        const itinerary = new Itinerary();
        expect(itinerary).toBeInstanceOf(Object);
    });

    it('accepts an array as ports', () => {
        const port1 = new Port('Dover');
        const port2 = new Port ('Calais');    
        const itinerary = new Itinerary([port1, port2]);
        expect(itinerary.ports).toEqual([port1, port2])
    });
});