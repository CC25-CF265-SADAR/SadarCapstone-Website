import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

Swiper.use([EffectCoverflow, Autoplay]);

export function initSwiper() {
  const swiperInstance = new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      reverseDirection: false,
    },
    slidesPerView: 'auto',
    spaceBetween: 200,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
  });

  console.log('Swiper initialized:', swiperInstance);
}
