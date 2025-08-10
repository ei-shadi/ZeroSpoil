import { motion } from "framer-motion";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const foodTips = [
  {
    category: "Dairy",
    food: "Milk",
    tip: "Store milk on the bottom shelf of the fridge where the temperature is most consistent, not in the door."
  },
  {
    category: "Vegetable",
    food: "Lettuce",
    tip: "Wrap lettuce in a paper towel and place it in a perforated plastic bag in the fridge to avoid wilting."
  },
  {
    category: "Fruit",
    food: "Bananas",
    tip: "Keep bananas at room temperature and separate them from other fruits to slow ripening."
  },
  {
    category: "Meat",
    food: "Chicken",
    tip: "Keep raw chicken in its original packaging, place it on the bottom shelf to avoid drips, and use within 2 days."
  },
  {
    category: "Bakery",
    food: "Bread",
    tip: "Store bread in a cool, dry place. For longer storage, freeze slices and toast them when needed."
  },
  {
    category: "Seafood",
    food: "Salmon",
    tip: "Keep salmon tightly wrapped in the coldest part of the fridge and use within 1–2 days of purchase."
  }
];

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 14,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const FreshFoodTips = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-7xl lg:max-w-screen-xl md:px-10 lg:px-8 lg:py-20">
      <div className="mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="text-4xl mb-6 md:text-6xl text-center font-bold leading-none tracking-tight text-color sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern id="dots" x="0" y="0" width=".135" height=".30">
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect fill="url(#dots)" width="52" height="24" />
            </svg>
            <span className="relative">How To</span>
          </span>{' '}
          Keep Your 
          <br />
          <span className="text-[#a05cff] italic pl-2">Food Fresh</span>
          <HiOutlineClipboardDocumentList className="inline ml-3 text-[#8338EC]" />
        </h2>
        <p className="text-base des-color text-center md:text-lg font-semibold opacity-70">
          Keep your food fresher for longer with smart storage! Learn simple tips tailored to each item—whether it's milk, meat, or veggies—to reduce waste and enjoy better taste every day.
        </p>
      </div>

      <motion.div
        className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {foodTips.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.08 }}
            className="p-5 bg-gradient-to-t from-[#009CB3] to-black text-white border-2 border-dashed shadow-sm border-deep-purple-accent-200 rounded-xl transition-transform duration-300 hover:from-black hover:to-[#009CB3]"
          >
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-xl font-bold text-white rounded-full bg-deep-purple-accent-400">
                {index + 1}.
              </p>
              <p className="text-2xl font-bold leading-5">
                {item.food} ({item.category})
              </p>
            </div>
            <p className="text-lg text-[#e07a5f]">{item.tip}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FreshFoodTips;
