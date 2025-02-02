// import Logo from "../../assets/Logo/logo.png";
import { FaFacebook, FaInstagram, FaTiktok} from 'react-icons/fa';

const Footer = () => {

  const emailAddress = 'contactpoliaid.info';


  return (
    <footer className="bg-[#E0F0B1] py-5">
      <div className="justify-content mx-auto w-5/6 gap-16 sm:flex">
        <div className="mt-10 basis-1/2 md:mt-0">
          {/* <img className="w-20 h-20" alt="logo" src={Logo} /> */}
          {/* <p className="my-5"> */}
            <h1 className="font-semibold">How to Reach Us</h1>
            <p>471 5th Ave.</p>
            <p>Brooklyn, NY 11215</p>
          {/* </p> */}
          
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold mb-6">Socials</h4>
          <div className="flex">
          
      <p className="mr-8">
      <a href="https://www.facebook.com/sipnplaynyc/" target="_blank" rel="noopener noreferrer">
        <FaFacebook className=" hover:animate-bounce w-6 h-6" />
      </a>
      </p>
      <p className="mr-8">
      <a href="https://www.instagram.com/sipnplaynyc/?hl=en" target="_blank" rel="noopener noreferrer">
        <FaInstagram className=" hover:animate-bounce w-6 h-6" />
      </a>
      </p>
      <p className="mr-8">
      <a href="https://www.tiktok.com/@sipnplaynycofficial?lang=en" target="_blank" rel="noopener noreferrer">
        <FaTiktok className=" hover:animate-bounce w-6 h-6" />
      </a>
      </p>
      </div>
    </div>
  
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          
          <p className="py-4">
            <a href={`mailto:${emailAddress}`} className="my-5 hover:underline">
              {emailAddress}
            </a>
          </p>
          <p className="py-2">(+1) (468) 457-4678</p>
          <p className="my-2">©2025 by PoliAid</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;