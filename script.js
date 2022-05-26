const mainSwiper = document.getElementById('mainSwiper');
const swiperWrapper = document.getElementById('swiperWrapper');

fetch('/data.json')
.then(res => res.json())
.then(res => {
    let swiper = new Swiper('.swiper', {
  
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        centeredSlidesBounds: true,
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    let array = res.responses[0][0].params.recommendedProducts['Size Özel'];
    createProductCard(array);
    
    console.log(res.responses[0][0].params.recommendedProducts['Size Özel']);
});

function createProductCard(array) {
    
    array.forEach((i) => {

        // Create p
        let p = document.createElement('p');
        p.className = 'card-text';
        p.innerText = `${i.price} TL`;

        // Create h5
        let p2 = document.createElement('p');
        p2.className = 'card-title';
        p2.innerText = `${i.name}`;

        // Create card body div
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        cardBodyDiv.appendChild(p2);
        cardBodyDiv.appendChild(p);

        // Create img
        let img = document.createElement('img');
        img.src = i.image;
        img.className = 'card-img-top';
        img.alt = '...';

        // Create card div
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        // Create container div
        let swiperSlide = document.createElement('div');
        swiperSlide.className = 'swiper-slide';
        swiperSlide.appendChild(cardDiv);
        swiperSlide.role = "group"; 

        swiperWrapper.appendChild(swiperSlide);
        mainSwiper.appendChild(swiperWrapper);
    });
}