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
});

function createProductCards(array) {

    array.forEach((i) => {
        let priceText = createParagraph('card-text', `${i.price} TL`);
        priceText.style = 'font-weight: bold; margin-left: 5px; text-align: left';

        let divPriceText = document.createElement('div');
        divPriceText.style = 'background-color: rgb(237 237 237); border-radius: 5px; padding: 10px';
        divPriceText.appendChild(priceText);

        let productNameText = createParagraph('card-text', i.name);
        productNameText.style = 'margin-bottom: 20px; font-size: medium; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;';

        let divProductNameText = document.createElement('div');
        divProductNameText.appendChild(productNameText);

        let addToCartButton = createButton('btnAddToCart', 'Sepete Ekle');
        addToCartButton.style = 'text-align: center; width: -webkit-fill-available; border-radius: 5px';
        addToCartButton.onclick = () => showPopup();

        let closePopupButton = document.getElementById('btnClosePopup');
        closePopupButton.onclick = () => closePopup();

        let divCartButton = createDiv('divAddToCart');
        divCartButton.style = 'margin-top: 15px;';
        divCartButton.appendChild(addToCartButton);

        let cardBodyDiv = createDiv('card-body');
        cardBodyDiv.appendChild(divProductNameText);
        cardBodyDiv.appendChild(divPriceText);
        cardBodyDiv.style = 'width: -webkit-fill-available;';
        
        if (i.params.shippingFee === 'FREE') {
            
            let spanShippingFeeSymbol = document.createElement('span');
            spanShippingFeeSymbol.style = 'margin-right: 10px';
            spanShippingFeeSymbol.innerHTML = '<i class="fa-solid fa-truck" style="color: green"></i>';
            
            let spanShippingFeeText = document.createElement('span');
            spanShippingFeeText.style = 'font-size: medium;';
            spanShippingFeeText.innerText = 'Ücretsiz Kargo';
            
            let divShipping = document.createElement('div');
            divShipping.style = 'display: flex; margin-top: 10px';
            divShipping.appendChild(spanShippingFeeSymbol);
            divShipping.appendChild(spanShippingFeeText);
            
            cardBodyDiv.appendChild(divShipping);
        }
        
        cardBodyDiv.appendChild(divCartButton);

        let img = createImage(i.image, 'card-img-top', '...');
        img.loading = 'lazy';

        let imgDiv = createDiv('imgDiv');
        imgDiv.appendChild(img);

        let cardDiv = createDiv('card');
        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.style = 'align-items: center;';

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

function showPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

function closePopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.remove('show');
}