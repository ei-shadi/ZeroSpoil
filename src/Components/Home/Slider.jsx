import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Btn from '../../Utilities/Btn';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    title: 'Never Let Food Go to Waste',
    description: 'Track your groceries and get notified before they expire.',
    buttonText: 'Start Tracking',
    imageUrl: 'https://i.ibb.co.com/mr7RxW2N/food-1.jpg',
  },
  {
    id: 2,
    title: 'Stay Organized, Eat Smarter',
    description: 'View and manage expiry dates in one clean dashboard.',
    buttonText: 'View Dashboard',
    imageUrl: 'https://i.ibb.co.com/xKdkrsT5/food-2.jpg',
  },
  {
    id: 3,
    title: 'Save Money & Reduce Waste',
    description: 'Cut down on waste and save on your grocery bills.',
    buttonText: 'Learn How',
    imageUrl: 'https://i.ibb.co.com/Fq3gn0Vx/food-3.jpg',
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
          <div className="relative h-screen w-full flex items-center justify-center">
            {/* Blurred background image */}
            <div
              className="absolute inset-0 bg-center bg-cover scale-105"
              style={{ filter: 'blur(3px)', backgroundImage: `url(${slide.imageUrl})` }}
              aria-hidden="true"
            ></div>

            {/* Overlay dark layer */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text content in front */}
            <div className="relative z-10 text-center text-white bg-black/60 py-20 md:py-20 px-2 md:px-20 rounded-2xl max-w-4xl mt-20 mx-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-3">{slide.title}</h2>
              <p className="mb-6 text-lg md:text-xl">{slide.description}</p>
              <div>
                <Link to="/fridge">
                <Btn name={slide.buttonText} />
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
