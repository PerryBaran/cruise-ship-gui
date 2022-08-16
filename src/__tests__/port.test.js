const Port = require('../Port');

describe('Port', () => {
    let port;

    beforeEach(() => {
        port = new Port('Dover');
    });

    it('can be instantiated', () => {
        expect(port).toBeInstanceOf(Object);
    });

    it('can be named', () => {
        expect(port.name).toEqual('Dover');
    });

    it('is initialised with an empty ship array', () => {
        expect(port.ships).toBeInstanceOf(Array);
        expect(port.ships).toHaveLength(0);
    });

    describe('add and remove ships', () => {
        let ship = jest.fn()
        
        it('can addShip', () => {
            port.addShip(ship);
            expect(port.ships).toContain(ship);
        });

        it('can removeShip', () => {
            port.addShip(ship);
            port.removeShip(ship);

            expect(port.ships).not.toContain(ship);
        });
    });

});