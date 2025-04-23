import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';

const FloatingButtons = () => {
  return (
    <div className="fixed right-4 bottom-20 flex flex-col gap-3 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/9022504359"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-green-600 p-3 rounded-full shadow-lg"
      >
        <WhatsAppIcon />
      </a>

      {/* Call */}
      <a
        href="tel:+919022504359"
        className="bg-blue-500 hover:bg-blue-600 text-blue-500  p-3 rounded-full shadow-lg"
      >
        <CallIcon />
      </a>
    </div>
  );
};

export default FloatingButtons;
