/*

Developed by https://github.com/armarce

12 - 08 - 2022

*/

class App{

    constructor(id, outputContainer, images){

        this.images = images;
        this.outputContainer = outputContainer;
        this.box = document.querySelector(`#${id}`);
        localStorage.clear();
        localStorage.setItem('opacity', 0.50);
        localStorage.setItem('rgba', 'rgba(255, 255, 255, 0.5)');
        this.cssProperties = window.getComputedStyle(this.box);

        this.copyCode();

    }

    copyCode(){

        let outputContainer = document.querySelector(`#${this.outputContainer}`);

        let buttonCopy = outputContainer.nextElementSibling;

        buttonCopy.addEventListener('click', () => {

            navigator.clipboard.writeText(outputContainer.textContent).then(() => {

                buttonCopy.setAttribute('value', 'Copied');

            })
            .catch();

        });

    }

    setProperty(value){

        this.box.style['backdrop-filter'] = value;
        this.box.style['-webkit-backdrop-filter'] = value;

    }

    elements(id){

        return [document.querySelector(`#${id}`), document.querySelector(`#${id}`).nextElementSibling];

    }

    toolTipShow(input, toolTip){
        
        input.addEventListener('mouseover', () => {
            
            toolTip.textContent = `${input.value}${input.getAttribute('data-unit')}`;
            toolTip.style['visibility'] = 'visible';
            
        });

        input.addEventListener('mouseout', () => {

            toolTip.style['visibility'] = 'hidden';
            
        });
        
    }

    toolTipUpdate(input, toolTip){

        toolTip.textContent = `${input.value}${input.getAttribute('data-unit')}`;

    }

    setRGBA(opacity){

        const rgb = window.getComputedStyle(this.box)['background-color'];
        let rgba = rgb.replace(/(rgb)/g, 'rgba').replace(/\)/g, `, ${opacity})`);

        localStorage.setItem('rgba', rgba);

        this.box.style['background-color'] =  rgba;

    }
    
    color(id){

        let [input] = this.elements(id);

        input.addEventListener('input', () => {

                document.querySelectorAll(`#${id}`)[0].setAttribute('value', input.value.toUpperCase());
                this.box.style['background-color'] = input.value;
                this.setRGBA(localStorage.getItem('opacity'));

                this.getCssCode();
    
            }
        );

    }

    opacity(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {

            let opacity = (input.value / 100);

            opacity = parseFloat(opacity).toFixed(2);
            
            let rgba = localStorage.getItem('rgba');
            rgba = rgba.replace(/(\d\.\d\d\))|(\d\.\d\))|(\s\d\))/g, `${opacity})`);

            localStorage.setItem('opacity', opacity);

            localStorage.setItem('rgba', rgba);

            this.box.style['background-color'] =  rgba;

            this.toolTipUpdate(input, toolTip);

            this.getCssCode();

        });

    }

    blur(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {

            let value = `blur(${input.value}${input.getAttribute('data-unit')})`;

            this.setProperty(value);

            localStorage.setItem('blur', value);

            this.toolTipUpdate(input, toolTip);

            this.getCssCode();
        
        });

    }
    
    contrast(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {
            
            let value = `contrast(${input.value}${input.getAttribute('data-unit')})`;

            this.setProperty(value);

            localStorage.setItem('contrast', value);

            this.toolTipUpdate(input, toolTip);

            this.getCssCode();
        
        });

    }

    brightness(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {
            
            let value = `brightness(${input.value}${input.getAttribute('data-unit')})`;

            this.setProperty(value);

            localStorage.setItem('brightness', value);

            this.toolTipUpdate(input, toolTip);

            this.getCssCode();
        
        });

    }

    saturate(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);
        
        input.addEventListener('input', () => {

            let value = `saturate(${input.value}${input.getAttribute('data-unit')})`;;
            
            this.setProperty(value);

            localStorage.setItem('saturate', value);

            this.toolTipUpdate(input, toolTip);

            this.getCssCode();
        
        });

    }    

    invert(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {

            let value = `invert(${input.value}${input.getAttribute('data-unit')})`;
            
            this.setProperty(value);

            localStorage.setItem('invert', value);

            this.toolTipUpdate(input, toolTip);

            this.getCssCode();
        
        });

    }

    size(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.setAttribute('value', this.cssProperties['width'].replace('px', ''));

        input.addEventListener('input', () => {

            this.box.style['width'] = `${input.value}${input.getAttribute('data-unit')}`;
            this.box.style['height'] = `${input.value}${input.getAttribute('data-unit')}`;

            this.toolTipUpdate(input, toolTip);

        });
        
    }

    radius(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.setAttribute('value', this.cssProperties['border-radius'].replace('%', ''));

        input.addEventListener('input', () => {

            this.box.style['border-radius'] = `${input.value}${input.getAttribute('data-unit')}`;

            this.toolTipUpdate(input, toolTip);

        });
        
    }

    selectImages(){

        let html = ''; 

        for(let image of this.images){

            let name = image.split('/').slice(-1);

            html += `<option value="${image}">${name}</option>`;

        }

        document.querySelector('select').innerHTML = html;

    }

    bgBody(){

        const body = document.querySelector('body')

        this.selectImages();

        const select = document.querySelector('select');

        select.addEventListener('change', (e) => {

            const image = e.target.value;

            body.style['background-image'] = `url('${image}')`;

        });

    }

    getCssCode(){

        let html = [];

        if(localStorage.getItem('rgba') !== null) html.push(`background-color: ${localStorage.getItem('rgba')}`);
        
        if(localStorage.getItem('blur') !== null) html.push(`backdrop-filter: ${localStorage.getItem('blur')}`);

        if(localStorage.getItem('contrast') !== null) html.push(`backdrop-filter: ${localStorage.getItem('contrast')}`);

        if(localStorage.getItem('brightness') !== null) html.push(`backdrop-filter: ${localStorage.getItem('brightness')}`);

        if(localStorage.getItem('saturate') !== null) html.push(`backdrop-filter: ${localStorage.getItem('saturate')}`);

        if(localStorage.getItem('invert') !== null) html.push(`backdrop-filter: ${localStorage.getItem('invert')}`);

        document.querySelector(`#${this.outputContainer}`).textContent = html.join(";\n") + ';';

        document.querySelector(`#${this.outputContainer}`).nextElementSibling.style.visibility = 'visible';

        document.querySelector(`#${this.outputContainer}`).nextElementSibling.setAttribute('value', 'Copy');

    }

}

const images = [
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/row-houses.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/camels.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/dawn.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/grassland.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/iceland.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/netherlands.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/norway.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/sea.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/village.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/winter-landscape.jpg'
    ];

const app = new App("box", 'outputContainer', images);

app.color('color');

app.opacity('opacity');

app.blur("blur");
app.contrast("contrast");
app.brightness("brightness");
app.invert("invert");
app.saturate("saturate");
app.size("size");
app.radius("radius");
app.bgBody();