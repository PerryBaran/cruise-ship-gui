const Port = require('../Port');

describe('Port', () => {
    it('can be instantiated', () => {
        const port = new Port();
        expect(port).toBeInstanceOf(Object);
    });

    it('can be named', () => {
        const port = new Port('Dover');
        expect(port.name).toEqual('Dover');
    });
});