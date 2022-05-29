const mainSwiper = document.getElementById('mainSwiper');
const swiperWrapper = document.getElementById('swiperWrapper');
const mainTab = document.getElementById('mainTab');
let selectedTabIndex = 0;
let tabButtonsArray = [];

fetch('/data.json')
.then(res => res.json())
.then(res => {
    let swiper = new Swiper('.swiper', {
  
        slidesPerView: 4,
        spaceBetween: 30,
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
    addBtnClickEvent(tabButtonsArray, recommendedProducts)
    createProductCards(recommendedProducts['Size Özel']);
});

function createProductCards(array) {

    array.forEach((i) => {
        
        // Create price text
        let priceText = createParagraph('card-text', `${i.price} TL`);
        priceText.style = 'background-color: #cecece; border-radius: 5px; font-weight: bold; margin-bottom: 15px';

        // Create div for price text
        let divPriceText = document.createElement('div');
        divPriceText.appendChild(priceText);

        // Create product name text
        let productNameText = createParagraph('card-text', i.name);
        productNameText.style = 'margin-bottom: 20px; font-size: medium; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;';

        // Create div for product name text
        let divProductNameText = document.createElement('div');
        divProductNameText.appendChild(productNameText);

        // // Create add to cart button
        // let addToCartButton = createButton('btn-primary', 'Sepete Ekle');
        // addToCartButton.style = 'width: 50%; text-align: center';

        // // Create div for button
        // let divCartButton = document.createElement('div');
        // divCartButton.appendChild(addToCartButton);

        // Create card body div
        let cardBodyDiv = createDiv('card-body');
        cardBodyDiv.appendChild(divProductNameText);
        cardBodyDiv.appendChild(divPriceText);
        // cardBodyDiv.appendChild(divCartButton);
        cardBodyDiv.style = 'width: inherit;';

        if (i.params.shippingFee === 'FREE') {
            
            // Create shipping fee text
            let shippingFeeText = createParagraph('card-text', 'Ücretsiz Kargo');
            shippingFeeText.style = 'font-size: medium';

            // Create div for shipping fee text
            let divShippingFeeText = document.createElement('div');
            divShippingFeeText.appendChild(shippingFeeText);

            cardBodyDiv.appendChild(divShippingFeeText);
        }

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

    unColorOtherTabs(tabButtonsArray, selectedTabIndex);
}

function createTabs(arrayTabs, productObject) {
    arrayTabs.forEach(i => {
        let button = createButton('tablinks', i);
        tabButtonsArray.push(button);
        mainTab.appendChild(button);
    });
}

function addBtnClickEvent(tabButtonsArray, productObject) {
    tabButtonsArray.forEach(i => {
        i.onclick = () => {
            clearProductCards();
            selectedTabIndex = tabButtonsArray.indexOf(i);
            createProductCards(productObject[i.innerText]);
        };
    });
}

function unColorOtherTabs(tabButtonsArray, index) {
    tabButtonsArray.forEach(i => {
        if (tabButtonsArray.indexOf(i) === index) {
            i.id = 'activeTab';
        }
        else {
            i.id = 'inactiveTab';
        }
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