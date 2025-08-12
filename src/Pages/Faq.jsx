import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const faqs = [
  {
    question: "What is ZeroSpoil?",
    answer:
      "ZeroSpoil is a full-stack web app that helps you manage your food items by tracking expiry dates and sending reminders to reduce food waste.",
  },
  {
    question: "How does ZeroSpoil remind me about expiring food?",
    answer:
      "ZeroSpoil sends you timely notifications based on the expiry dates you enter, so you can use your food before it spoils.",
  },
  {
    question: "Do I need to create an account to use ZeroSpoil?",
    answer:
      "Yes, ZeroSpoil uses authentication to securely save your food items and preferences across devices.",
  },
  {
    question: "Can I add, edit, or delete food items?",
    answer:
      "Absolutely! ZeroSpoil is a complete CRUD system, so you can add, update, or remove food entries anytime.",
  },
  {
    question: "Is ZeroSpoil free to use?",
    answer:
      "Yes, ZeroSpoil is designed as an open and accessible tool to help reduce food waste for everyone.",
  },
  {
    question: "How secure is my data on ZeroSpoil?",
    answer:
      "We use authentication and secure storage practices to ensure your data is protected and only accessible by you.",
  },
  {
    question: "Can I access ZeroSpoil on mobile devices?",
    answer:
      "Yes, ZeroSpoil is fully responsive and works smoothly on both desktop and mobile devices.",
  },
  {
    question: "Does ZeroSpoil support multiple users in one household?",
    answer:
      "Currently, each account is individual, but you can share login details or we plan to add multi-user support soon.",
  },
  {
    question: "How do I get notified about expiring items?",
    answer:
      "You can enable email or in-app notifications to receive timely reminders about your food items nearing expiry.",
  },
  {
    question: "Can I export my food inventory?",
    answer:
      "Exporting data is not available yet, but it’s on our roadmap to help users manage their inventories externally.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-36 px-4 md:px-8 lg:px-16">
      <h2 className="max-w-4xl mx-auto text-center mb-12 text-4xl md:text-5xl font-semibold w-3/4">
        <span className="text-[#a05cff] italic pr-3">
          Frequently
        </span>
          Asked Questions
        <HiOutlineClipboardDocumentList className="inline ml-3 text-[#8338EC] text-5xl md:text-6xl align-middle" />
      </h2>

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <div className="space-y-5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-purple-600 rounded-lg bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="font-semibold text-black text-lg md:text-2xl">
                    {faq.question}
                  </span>
                  <motion.svg
                    className="w-7 h-7 text-green-700"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginTop: 12 },
                        collapsed: { opacity: 0, height: 0, marginTop: 0 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 overflow-hidden bg-green-100 text-green-900 rounded-b-lg"
                    >
                      <p className="py-4 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
