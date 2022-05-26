const mainSwiper = document.getElementById('mainSwiper');
const swiperWrapper = document.getElementById('swiperWrapper');

const swiper = new Swiper('.swiper', {
  
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    // centeredSlidesBounds: true,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

fetch('./data.json')
.then(res => res.json())
.then(res => {
    let array = res.responses[0][0].params.userCategories;
    
});

function createProductCard(number) {

    for (let i = 1; i < number + 1; i++) {
        
        // Create a
        let a = document.createElement('a');
        a.href = '#';
        a.classList.add('btn', 'btn-primary');
        a.innerText = 'Go somewhere';

        // Create p
        let p = document.createElement('p');
        p.className = 'card-text';
        p.innerText = `Card Text ${i}`;

        // Create h5
        let h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.innerText = 'Card Title';

        // Create card body div
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        cardBodyDiv.appendChild(h5);
        cardBodyDiv.appendChild(p);
        cardBodyDiv.appendChild(a);

        // Create img
        // let img = document.createElement('img');
        // img.src = '...';
        // img.className = 'card-img-top';
        // img.alt = '...';

        // Create card div
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        // cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        // Create container div
        let swiperSlide = document.createElement('div');
        swiperSlide.className = 'swiper-slide';
        swiperSlide.appendChild(cardDiv);
        swiperSlide.role = "group"; 

        swiperWrapper.appendChild(swiperSlide);
        mainSwiper.appendChild(swiperWrapper);
    }
}

const btnDemo = document.getElementById('demo');
btnDemo.addEventListener('click', demo);

createProductCard(24);

function demo() {
    console.log(swiper.slides.length);
    console.log(swiper.activeIndex);
    if (swiper.activeIndex > 0) {
        console.log(swiper.slides[swiper.activeIndex - 1].classList);
    }
    console.log(swiper.slides[swiper.activeIndex].classList);
    if (swiper.activeIndex < swiper.slides.length - 1) {
        console.log(swiper.slides[swiper.activeIndex + 1].classList);
    }
}

swiper.on('slideChange', () => {
    if (swiper.activeIndex > 0) {
        swiper.slides[swiper.activeIndex - 1].classList.add('swiper-slide-prev');
    }
    if (swiper.activeIndex < swiper.slides.length - 1) {
        swiper.slides[swiper.activeIndex + 1].classList.add('swiper-slide-next');
    }
});