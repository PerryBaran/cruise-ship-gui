const Itinerary = require('../Itinerary');

describe('Itinerary', () => {
    it('can be instantiated', () => {
        const itinerary = new Itinerary();
        expect(itinerary).toBeInstanceOf(Object);
    });

    it('accepts ports as an array', () => {
        const port1 = jest.fn();
        const port2 = jest.fn();   
        const itinerary = new Itinerary([port1, port2]);
        expect(itinerary.ports).toEqual([port1, port2])
    });
});