"use client"
import React from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation once when it enters the viewport
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  return (
    <div className="pt-10">
      <div
        ref={ref}
        className={`bg-[#E0F0B1] bg-opacity-95 font-mono p-10 ${inView ? 'animate-slide-in' : ''}`}
      >
        <h1 className="text-5xl text-white pb-5 typing-effect break-words max-w-full">What is PoliAid and how does it work?</h1>
        <p>
          Scrape legislative information for specific representatives and use generative AI to
          provide an email/letter template to contact that representative and provide feedback on their legislative decisions.
        </p>
        <p>
          The Legislative Contact Web App empowers citizens to stay informed about their representatives’ 
          legislative decisions and voice their opinions effectively. By combining real-time legislative 
          data with AI-generated email and letter templates, this tool simplifies the process of contacting 
          elected officials. Whether you want to express support, concern, or request action on specific policies,
          our platform provides a seamless experience for civic engagement.
        </p>
      </div>
    </div>
  );
};

export default About;
