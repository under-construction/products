const mainSwiper = document.getElementById('mainSwiper');
const swiperWrapper = document.getElementById('swiperWrapper');
const mainTab = document.getElementById('mainTab');
const sidebar = document.getElementById('sidebarContainer')
let selectedTabIndex = 0;
let tabButtonsArray = [];
let sidebarButtonsArray = [];

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

    createTabs(userCategories, tabButtonsArray, mainTab, 'tablinks');
    createTabs(userCategories, sidebarButtonsArray, sidebar, 'sidebarButton');
    addBtnClickEvent(tabButtonsArray, recommendedProducts)
    addBtnClickEvent(sidebarButtonsArray, recommendedProducts);
    createProductCards(recommendedProducts['Size Özel']);
    console.log(swiper.params.slidesPerView);
});

function createProductCards(array) {

    array.forEach((i) => {
        // Create price text
        let priceText = createParagraph('card-text', `${i.price} TL`);
        priceText.style = 'font-weight: bold; margin-left: 5px; text-align: left';

        // Create div for price text
        let divPriceText = document.createElement('div');
        divPriceText.style = 'background-color: rgb(237 237 237); border-radius: 5px; padding: 10px';
        divPriceText.appendChild(priceText);

        // Create product name text
        let productNameText = createParagraph('card-text', i.name);
        productNameText.style = 'margin-bottom: 20px; font-size: medium; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;';

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
        cardBodyDiv.style = 'width: -webkit-fill-available;;';

        if (i.params.shippingFee === 'FREE') {
            
            // Create shipping fee text
            let spanShippingFeeSymbol = document.createElement('span');
            spanShippingFeeSymbol.style = 'margin-right: 10px';
            spanShippingFeeSymbol.innerHTML = '<i class="fa-solid fa-truck" style="color: green"></i>';

            // Create shipping fee text
            let spanShippingFeeText = document.createElement('span');
            spanShippingFeeText.style = 'font-size: medium;';
            spanShippingFeeText.innerText = 'Ücretsiz Kargo';

            // Create div
            let divShipping = document.createElement('div');
            divShipping.style = 'display: flex; margin-top: 10px';
            divShipping.appendChild(spanShippingFeeSymbol);
            divShipping.appendChild(spanShippingFeeText);

            cardBodyDiv.appendChild(divShipping);
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
    unColorOtherTabsSidebar(sidebarButtonsArray, selectedTabIndex);
}

function createTabs(arrayTabs, arrayToPush, mainContainer, btnClass) {
    arrayTabs.forEach(i => {
        let button = createButton(btnClass, i.substring(i.indexOf('> ') + 1));
        button.name = i;
        arrayToPush.push(button);
        mainContainer.appendChild(button);
    });
}

function addBtnClickEvent(tabButtonsArray, productObject) {
    tabButtonsArray.forEach(i => {
        i.onclick = () => {
            clearProductCards();
            selectedTabIndex = tabButtonsArray.indexOf(i);
            createProductCards(productObject[i.name]);
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

function unColorOtherTabsSidebar(tabButtonsArray, index) {
    tabButtonsArray.forEach(i => {
        if (tabButtonsArray.indexOf(i) === index) {
            i.id = 'activeTabSidebar';
        }
        else {
            i.id = 'inactiveTabSidebar';
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