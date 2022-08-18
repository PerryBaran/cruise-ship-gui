const OFFSET_OFFSET = 32;

(function exportController() {
    class Controller{
        constructor(ship){
            this.ship = ship
            this.initialiseSea();
            document.getElementById('sailButton').onclick = () => {
                this.setSail();
            };
        };

        initialiseSea() {
            const backgrounds = [
                './images/water0.png',
                './images/water1.png'
            ];
        
            const viewport = document.getElementById('viewport');
            let index = 0;
        
            setInterval(() => {
                viewport.style.backgroundImage = `url(${backgrounds[index % backgrounds.length]})`;
                index += 1;
            }, 1000);
        };

        renderPorts(ports) {
            const portsContainer = document.getElementById('ports');
            let portsWidth = 0;

            ports.forEach((port, i) => {
                const portElement = document.createElement('div');
                portElement.className = 'port';
                portElement.dataset.portName = port.name;
                portElement.dataset.portIndex = i;

                portsWidth += 256;

                portsContainer.appendChild(portElement);
            });

            portsContainer.style.width = `${portsWidth}px`;
        };

        renderShip() {
            const shipElement = document.getElementById('ship');

            const portIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort);
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);
            
            shipElement.style.left = `${portElement.offsetLeft - OFFSET_OFFSET}px`;
            shipElement.style.top = `${portElement.offsetTop + OFFSET_OFFSET}px`;
        };

        setSail() {
            const portIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort) + 1;
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);

            if (!portElement) {
                return alert('End of the line!');
            };

            const shipElement = document.getElementById('ship');

            const portLeft = portElement.offsetLeft - OFFSET_OFFSET;
            let shipLeft = shipElement.offsetLeft;
            
            this.ship.setSail();

            const sail = setInterval(() => {
                shipLeft++;
                shipElement.style.left = `${shipLeft}px`
                if (shipLeft === portLeft) {
                    clearInterval(sail)
                }
            }, 10);

            this.ship.dock();
        };
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());