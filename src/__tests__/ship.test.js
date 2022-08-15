const { Ship } = require('../Ship');
const { Port } = require('../Port');

describe('Port', () => {
    it('can be instantiated', () => {
        const port = new Port();
        expect(port).toBeInstanceOf(Object)
    });

    it('can be named', () => {
        const port = new Port('Dover');
        expect(port.name).toEqual('Dover');
    });
});

describe('Ship', () => {
    it('can be instantiated', () => {
       const ship = new Ship();
       expect(ship).toBeInstanceOf(Object) 
    });

    describe('Dock', () => {
        it('starting point is an object', () => {
            const port = new Port()
            const ship = new Ship(port);
            expect(ship.currentPort).toBeInstanceOf(Object);
        });

        it('starting point has a name', () => {
            const port = new Port('Dover');
            const ship = new Ship(port);
            expect(ship.currentPort.name).toEqual('Dover');
        });

        it('can set sail', () => {
            const port = new Port('Dover');
            const ship = new Ship(port);
            ship.setSail();
            expect(ship.currentPort).toBeFalsy();
        });

        it('can dock at a new port', () => {
            const port = new Port('Dover');
            const ship = new Ship(port);
            const calais = new Port('Calais')
            ship.dock(calais);
            expect(ship.currentPort.name).toEqual('Calais')  
        });
    });
});