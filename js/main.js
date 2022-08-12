class App{

    constructor(id, images){

        this.images = images;
        this.box = document.querySelector(`#${id}`);
        localStorage.setItem('opacity', 0.99);
        this.cssProperties = window.getComputedStyle(this.box);

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

        this.box.style['background-color'] =  rgba;

    }
    
    color(id){

        let [input] = this.elements(id);

        input.addEventListener('input', () => {

                document.querySelectorAll(`#${id}`)[0].setAttribute('value', input.value.toUpperCase());
                this.box.style['background-color'] = input.value;
                this.setRGBA(localStorage.getItem('opacity'));
    
            }
        );
    }

    opacity(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {

            let opacity = (input.value / 100) - 0.01;

            localStorage.setItem('opacity', opacity);
            
            let rgba = window.getComputedStyle(this.box)['background-color']
            rgba = rgba.replace(/(\d\.\d\d\))|(\d\.\d\))|(\s\d\))/g, `${opacity})`);

            this.box.style['background-color'] =  rgba;

            this.toolTipUpdate(input, toolTip);

        });

    }

    blur(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {

            this.box.style['backdrop-filter'] = `blur(${input.value}px)`;

            this.toolTipUpdate(input, toolTip);
        
        });

    }
    
    contrast(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {
            
            this.box.style['backdrop-filter'] = `contrast(${input.value}%)`;

            this.toolTipUpdate(input, toolTip);
        
        });

    }

    brightness(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {
            
            this.box.style['backdrop-filter'] = `brightness(${input.value}%)`;

            this.toolTipUpdate(input, toolTip);
        
        });

    }

    invert(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.addEventListener('input', () => {
            
            this.box.style['backdrop-filter'] = `invert(${input.value}%)`;

            this.toolTipUpdate(input, toolTip);
        
        });

    }

    size(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.setAttribute('value', this.cssProperties['width'].replace('px', ''));

        input.addEventListener('input', () => {

            this.box.style['width'] = `${input.value}px`;
            this.box.style['height'] = `${input.value}px`;

            this.toolTipUpdate(input, toolTip);

        });
        
    }

    radius(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);

        input.setAttribute('value', this.cssProperties['border-radius'].replace('%', ''));

        input.addEventListener('input', () => {

            this.box.style['border-radius'] = `${input.value}%`;

            this.toolTipUpdate(input, toolTip);

        });
        
    }
    
    saturate(id){

        let [input, toolTip] = this.elements(id);

        this.toolTipShow(input, toolTip);
        
        input.addEventListener('input', () => {
            
            this.box.style['backdrop-filter'] = `saturate(${input.value}%)`;

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

}

const images = [
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/1.webp',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/2.webp',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/3.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/4.webp',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/5.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/camels-gd86999c00_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/foz-do-iguacu-g1190e905d_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/grassland-gff1701c43_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/iceland-gf4872b4df_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/netherlands-gf2ab7325d_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/norway-ge6d1df026_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/row-houses-g56486a6f6_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/village-ge2ada5f99_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/carousel/winter-landscape-g570cb6895_1280.jpg',
    'https://cdn.armcloud.store/206b9c3284cb4dabafdf5bf6ec21e929:images/bg/aurora.jpg'
    ];

const app = new App("box", images);

app.color('color');

app.opacity('opacity');

app.blur("blur");
app.contrast("contrast");
app.brightness("brightness");
app.invert("invert");
app.size("size");
app.radius("radius");
app.saturate("saturate");
app.bgBody();