const OFFSET_OFFSET = 32;

function reset(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

(function exportController() {
    class Controller{
        constructor(ship){
            this.ship = ship
            this.initialiseSea();
            this.headsUp();
            this.renderShip();
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

        renderPorts(ship) {
            this.ship = ship;
            const ports = ship.itinerary.ports;
            const portsContainer = document.getElementById('ports');
            reset(portsContainer);
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
            this.headsUp();
            this.renderShip();
        };

        renderShip() {
            const currentPort = this.ship.currentPort;
            if (!currentPort) return;
            const shipElement = document.getElementById('ship');

            const portIndex = this.ship.itinerary.ports.indexOf(currentPort);
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);
            
            shipElement.style.left = `${portElement.offsetLeft - OFFSET_OFFSET}px`;
            shipElement.style.top = `${portElement.offsetTop + OFFSET_OFFSET}px`;
        };

        setSail() {
            const portIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort) + 1;
            const portElement = document.querySelector(`[data-port-index="${portIndex}"]`);

            if (!portElement) return this.renderMessage('End of the line!');

            const button = document.getElementById('sailButton');
            button.disabled = true;

            const shipElement = document.getElementById('ship');

            const portLeft = portElement.offsetLeft - OFFSET_OFFSET;
            let shipLeft = shipElement.offsetLeft;
            
            this.ship.setSail();
            this.renderMessage(`Now departing ${this.ship.previousPort.name}`);

            const sail = setInterval(() => {
                shipLeft++;
                shipElement.style.left = `${shipLeft}px`;

                if (portLeft - shipLeft === 100) {
                    this.ship.dock();
                    this.renderMessage(`Now arriving at ${this.ship.currentPort.name}`);
                }
                if (shipLeft === portLeft) {
                    clearInterval(sail);
                    this.headsUp();
                    button.disabled = false; 
                }
            }, 20);

        };

        renderMessage(message) {
            const button = document.getElementById('sailButton');
            button.className = 'message';
            button.innerHTML = message;
            setTimeout(() => {
                if (this.ship.currentPort) {
                    button.className = 'sailButton';
                    button.innerHTML = 'Set Sail!';
                } else {
                    button.innerHTML = 'Sailing...';
                }
            }, 2000);
        };

        headsUp() {
            const currentPort = this.ship.currentPort
            const ports = this.ship.itinerary.ports

            const currentPortElement = document.getElementById('currentPort');
            const nextPortElement = document.getElementById('nextPort');

            if (currentPort) {
                currentPortElement.innerHTML = `${currentPort.name}`;
                const nextPortIndex = ports.indexOf(currentPort) + 1;
                
                if (nextPortIndex === ports.length) {
                    nextPortElement.innerHTML = 'None';
                } else {
                    nextPortElement.innerHTML = `${ports[nextPortIndex].name}`
                }                
            } else {
                currentPortElement.innerHTML = 'None';
                nextPortElement.innerHTML = 'None';
            }
        };
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());