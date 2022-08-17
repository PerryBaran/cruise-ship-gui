(function exportController() {
    class Controller{
        constructor(){
            this.initialiseSea();
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

        renderShip(ship) {
            const viewport = document.getElementById('viewport');
            const shipElement = document.createElement('div');
            shipElement.className='ship';

            const portIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);
            
            shipElement.style.left = `${portElement.offsetLeft - 32}px`;
            shipElement.style.top = `${portElement.offsetTop + 32}px`;

            viewport.appendChild(shipElement);
        };
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());