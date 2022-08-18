const SHIP_OFFSET = 32;
const MESSAGE_TIMEOUT  = 2000;
const SHIP_INTERVAL = 40;
const ARRIVING_MESSAGE_TIME = MESSAGE_TIMEOUT/SHIP_INTERVAL;

function resetContainer(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

(function exportController() {
    class Controller{
        constructor(ship){
            this.ship = ship
            this.initialiseSea();
            this.initialiseShipPosition();
            this.updateHeadsUpDisplay();

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
                index++;
            }, 1000);
        };

        renderPorts(ports) {
            const portsContainer = document.getElementById('ports');
            resetContainer(portsContainer);

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

        initialiseShipPosition() {
            const currentPort = this.ship.currentPort;
            if (!currentPort) return;

            const shipElement = document.getElementById('ship');

            const portIndex = this.ship.itinerary.ports.indexOf(currentPort);
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);
            
            shipElement.style.left = `${portElement.offsetLeft - SHIP_OFFSET}px`;
            shipElement.style.top = `${portElement.offsetTop + SHIP_OFFSET}px`;
        };

        setSail() {
            const ports = this.ship.itinerary.ports
            const portIndex = ports.indexOf(this.ship.currentPort) + 1;
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);

            if (!portElement) return this.renderMessage('End of the line!');

            const sailButton = document.getElementById('sailButton');
            sailButton.disabled = true;

            const shipElement = document.getElementById('ship');

            const portLeft = portElement.offsetLeft - SHIP_OFFSET;
            let shipLeft = shipElement.offsetLeft;

            this.ship.setSail();
            this.updateHeadsUpDisplay();
            this.renderMessage(`Now departing ${this.ship.previousPort.name}`);

            const sail = setInterval(() => {
                shipLeft++;
                shipElement.style.left = `${shipLeft}px`;

                if (portLeft - shipLeft === ARRIVING_MESSAGE_TIME) {
                    const nextPort = ports[portIndex]
                    this.renderMessage(`Now arriving at ${nextPort.name}`);
                };
                if (shipLeft === portLeft) {
                    clearInterval(sail);
                    this.ship.dock();
                    this.updateHeadsUpDisplay();
                    sailButton.disabled = false; 
                };
            }, SHIP_INTERVAL);
        };

        renderMessage(message) {
            const button = document.getElementById('sailButton');
            button.innerHTML = message;

            setTimeout(() => {
                if (this.ship.currentPort) {
                    button.innerHTML = 'Set Sail!';
                } else {
                    button.innerHTML = 'Sailing...';
                };
            }, MESSAGE_TIMEOUT);
        };

        updateHeadsUpDisplay() {
            const currentPort = this.ship.currentPort;
            const ports = this.ship.itinerary.ports;

            const currentPortElement = document.getElementById('currentPort');
            const nextPortElement = document.getElementById('nextPort');

            if (!ports.length) {
                currentPortElement.innerHTML = 'None';
                nextPortElement.innerHTML = 'None';                
            } else {
                const currentPreviousElement = document.getElementById('currentPrevious');
                let nextPortIndex;

                if (!currentPort) {
                    const previousPort = this.ship.previousPort;
                    currentPreviousElement.innerHTML = 'Previous';
                    currentPortElement.innerHTML = previousPort.name;
                    nextPortIndex = ports.indexOf(previousPort) + 1;
                } else {
                    currentPreviousElement.innerHTML = 'Current';
                    currentPortElement.innerHTML = currentPort.name;
                    nextPortIndex = ports.indexOf(currentPort) + 1;
                };

                if (nextPortIndex === ports.length) {
                   nextPortElement.innerHTML = 'None';
                } else {
                    nextPortElement.innerHTML = ports[nextPortIndex].name;
                };
            };
        };

        addPort(port){
            this.ship.addPort(port);
            this.updateHeadsUpDisplay();
            this.renderPorts(this.ship.itinerary.ports);
            this.initialiseShipPosition();
        };
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());