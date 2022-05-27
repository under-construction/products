const mainSwiper = document.getElementById('mainSwiper');
const swiperWrapper = document.getElementById('swiperWrapper');
const mainTab = document.getElementById('mainTab');
const btnPress = document.getElementById('btnPress');

fetch('/data.json')
.then(res => res.json())
.then(res => {
    let swiper = new Swiper('.swiper', {
  
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        centeredSlidesBounds: true,
        observer: true,
        observeParents: true,
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    let userCategories = res.responses[0][0].params.userCategories;
    let recommendedProducts = res.responses[0][0].params.recommendedProducts;

    createTabs(userCategories, recommendedProducts);
});

function createProductCards(array) {

    array.forEach((i) => {
        
        // Create p
        let p = createParagraph('card-text', `${i.price} TL`);

        // Create p2
        let p2 = createParagraph('card-text', i.name);

        // Create div for p2
        let p2Div = document.createElement('div');
        p2Div.style = 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;'
        p2Div.appendChild(p2);
        
        // Create add to cart button
        let addToCartButton = createButton('btn-primary', 'Sepete Ekle');
        addToCartButton.style = 'width: 50%; text-align: center';

        // Create card body div
        let cardBodyDiv = createDiv('card-body');
        cardBodyDiv.appendChild(p2Div);
        cardBodyDiv.appendChild(p);
        cardBodyDiv.appendChild(addToCartButton);
        cardBodyDiv.style = 'width: inherit;';

        // Create img
        let img = createImage(i.image, 'card-img-top', '...');

        // Create div for img
        let imgDiv = createDiv('imgDiv');
        imgDiv.appendChild(img);

        // Create card div
        let cardDiv = createDiv('card');
        // cardDiv.appendChild(img);
        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.style = 'align-items: center;';

        // Create swiper slide div
        let swiperSlideDiv = createDiv('swiper-slide');
        swiperSlideDiv.appendChild(cardDiv);

        swiperWrapper.appendChild(swiperSlideDiv);
        mainSwiper.appendChild(swiperWrapper);
    });
}

function createTabs(arrayTabs, productObject) {
    arrayTabs.forEach(i => {
        let button = createButton('tablinks', i);
        button.onclick = () => {
            clearProductCards();
            createProductCards(productObject[i]);
        };
        mainTab.appendChild(button);
    });
}

function createParagraph(className, innerText) {
    let p = document.createElement('p');
    p.className = className;
    p.innerText = `${innerText}`;

    return p;
}

function createImage(src, className, alt) {
    let img = document.createElement('img');
    img.src = src;
    img.className = className;
    img.alt = alt;

    return img;
}

function createDiv(className) {
    let div = document.createElement('div');
    div.className = className;

    return div;
}

function createButton(className, innerText) {
    let button = document.createElement('button');
    button.className = className;
    button.innerText = innerText;

    return button;
}

function clearProductCards() {
    let cardElements = document.getElementsByClassName('swiper-slide');
    Array.from(cardElements).forEach(i => {
        i.remove();
    });
}