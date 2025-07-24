import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    question: 'What is The Hive?',
    answer: 'The Hive is a modular network of interoperable DeFi agents.'
  },
  {
    question: 'Which blockchains are supported?',
    answer: 'The Hive supports multiple blockchains. Please refer to the documentation for the latest list.'
  },
  {
    question: 'What else can The Hive do?',
    answer: 'The Hive enables seamless DeFi interactions, protocol integrations, and more.'
  },
  {
    question: 'Is the project open source?',
    answer: 'Yes, The Hive is open source. You can find the code on our GitHub.'
  },
  {
    question: 'Does The Hive have a token?',
    answer: 'Currently, The Hive does not have a native token.'
  },
  {
    question: 'Is there a community channel?',
    answer: 'Yes, join our Discord or Telegram for community discussions.'
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, idx) => (
          <div className="faq-item" key={idx}>
            <button
              className="faq-question"
              onClick={() => toggleIndex(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              {item.question}
              <span className={`faq-arrow${openIndex === idx ? ' open' : ''}`}>▼</span>
            </button>
            {openIndex === idx && (
              <div className="faq-answer" id={`faq-answer-${idx}`}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
