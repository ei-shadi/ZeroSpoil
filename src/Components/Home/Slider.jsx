import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Button from '../../Shared/Btn';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    title: 'Never Let Food Go to Waste',
    description: 'Track your groceries and get notified before they expire.',
    buttonText: 'Start Tracking',
    imageUrl: 'https://i.ibb.co.com/WWnR5J9Q/Food1.jpg'
  },
  {
    id: 2,
    title: 'Stay Organized, Eat Smarter',
    description: 'View and manage expiry dates in one clean dashboard.',
    buttonText: 'View Dashboard',
    imageUrl: 'https://i.ibb.co.com/BKN8J30B/Food2.jpg'
  },
  {
    id: 3,
    title: 'Save Money & Reduce Waste',
    description: 'Cut down on waste and save on your grocery bills.',
    buttonText: 'Learn How',
    imageUrl: 'https://i.ibb.co.com/RG1c5Cnd/Food3.jpg',
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
            className="h-[89vh] md:h-[85vh] w-full bg-center bg-cover relative flex items-center justify-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text content */}
            <div className="relative z-10 text-center text-white bg-black/60 py-16 md:py-20 px-4 md:px-16 rounded-2xl max-w-4xl mx-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-3">{slide.title}</h2>
              <p className="mb-6 text-base md:text-xl">{slide.description}</p>
              <div>
                <Link to="/fridge">
                  <Button name={slide.buttonText} />
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
