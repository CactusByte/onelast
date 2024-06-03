'use client'

import { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (!isDeleting && index < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
    } else if (index === text.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Wait 2 seconds before starting to delete
    } else if (isDeleting && index > 0) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, speed);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeoutId);
  }, [index, isDeleting, text, speed]);

  return (
    <div className="text-center font-mono text-l">
      {displayedText}
      <span className="inline-block bg-black ml-1 w-2 animate-blink">|</span>
    </div>
  );
};

export default TypingEffect;

