import React, { useEffect } from 'react';
import './circularText.css';

const CircularText = () => {

  useEffect(() => {
    const textElement = document.querySelector('.text');
    const text = textElement.innerText;
    textElement.innerHTML = ''; // Limpiamos el contenido original

    for (let i = 0; i < text.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.textContent = text[i];
      charSpan.style.transform = `rotate(${i * 7}deg)`;
      textElement.appendChild(charSpan);
    }
  }, []);

  return (
    <div className="circle">
      <div className='logo'></div>
      <div className='text'>
      - Willy's - Investments - Bank
      </div>
    </div>
  );
};

export default CircularText;
