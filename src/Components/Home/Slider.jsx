import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Btn from "../../Utilities/Btn";



const slides = [
  {
    id: 1,
    title: 'Never Let Food Go to Waste',
    description: 'Track your groceries and get notified before they expire.',
    buttonText: 'Start Tracking',
    imageUrl: 'https://i.ibb.co/rrDGcmQ/food-1.jpg',
  },
  {
    id: 2,
    title: 'Stay Organized, Eat Smarter',
    description: 'View and manage expiry dates in one clean dashboard.',
    buttonText: 'View Dashboard',
    imageUrl: 'https://i.ibb.co/fGPcQh0Y/food-2.jpg',
  },
  {
    id: 3,
    title: 'Save Money & Reduce Waste',
    description: 'Cut down on waste and save on your grocery bills.',
    buttonText: 'Learn How',
    imageUrl: 'https://i.ibb.co/rK266YmS/food-3.jpg',
  },
];

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      effect="fade"
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      className="w-full"
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div
            className="h-[750px]  w-full bg-cover bg-center relative flex items-center justify-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{slide.title}</h2>
              <p className="mb-4 text-lg">{slide.description}</p>

              <Btn name={slide.buttonText} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
