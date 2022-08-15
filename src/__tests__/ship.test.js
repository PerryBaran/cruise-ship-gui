const { Ship } = require('../Ship');

describe('Ship', () => {
    it('can be instantiated', () => {
       const ship = new Ship();
       expect(ship).toBeInstanceOf(Object) 
    });

    it('has a starting port', () => {
        const ship = new Ship('Dover');
        expect(ship.startingPort).toEqual('Dover')
    });
});