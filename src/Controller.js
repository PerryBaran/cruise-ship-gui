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
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());



const initialiseSea = () => {
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