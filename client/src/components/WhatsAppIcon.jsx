import { FaWhatsapp } from "react-icons/fa";

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/919850360869"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[5.5rem] right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-[99999]"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppIcon;