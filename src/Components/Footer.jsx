import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className=" text-gray-100 py-10 bg-[#101A23]">
      <div className=" py-12 px-6">

        {/* Sign up --------------------------------- from here */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#CDF7FF] text-center sm:text-left">
            Get News & Latest Updates
          </h2>

         
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 w-full sm:w-auto">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Your email address"
              className="bg-[#0c0f15] text-[#8b97a2] placeholder-[#8b97a2] px-4 py-3 rounded-md focus:outline-none w-full sm:w-auto"
            />

            
            <button className="bg-[#CDF7FF] text-[#0c0f15] font-bold flex justify-center items-center px-6 py-3 rounded-md mt-3 sm:mt-0 w-full sm:w-auto">
              <span className="mr-2">SIGN UP</span>
              <FaArrowRightLong />
            </button>
          </div>
        </div>


      </div>

      <div className="border-t border-[#809DA5] mb-20 w-4/5 mx-auto">

      </div>

      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Column start*/}
          <div>
            <div>
              <h2 className="text-xl font-semibold  mb-4 text-[#6facbe]"><img className="w-20 h-20" src="https://i.ibb.co.com/tLdwGjp/logo-11.webp" alt="" /></h2>
              <div className="text-[#809DA5]">
                <p>Sherpur</p>
                <p>Sherpur, Bogura 5840</p>
              </div>
              <p className="text-[#809DA5] font-semibold">Phone: <a href="+8801719617907" className="text-[#549aad]">+8801719617907</a></p>
              <p className="text-[#809DA5] font-semibold">Email: <a href="mailto:info@example.com" className="text-[#549aad]">abdurrahman@gmail.com</a></p>
            </div>
            <div className="flex gap-4 pt-3">
              <a href="https://www.facebook.com/" className="p-3 bg-[#CDF7FF] text-[#0c0f15] rounded-md"><i><FaFacebookF></FaFacebookF></i></a>
              <a href="https://twitter.com" className="p-3 bg-[#CDF7FF] text-[#0c0f15] rounded-md"><i><FaTwitter></FaTwitter></i></a>
              <a href="https://www.youtube.com/" className="p-3 bg-[#CDF7FF] text-[#0c0f15] rounded-md"><i><FaYoutube></FaYoutube></i></a>
            </div>
          </div>

          {/* Second Column start*/}
          <div>
            <h2 className="text-xl font-semibold text-[#6facbe] mb-4">Useful Links</h2>
            <ul className="text-[#809DA5]">
              <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="/about" className="hover:text-blue-500 transition">About Us</a></li>
              <li><a href="/available-cars" className="hover:text-blue-500 transition">All Available Cars</a></li>
              <li><a href="/#" className="hover:text-blue-500 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Third Column end*/}
          <div>
            <h2 className="text-xl font-semibold  mb-4 text-[#6facbe]">Our Services</h2>
            <p className="text-[#809DA5]">RideXpress offers a seamless car rental experience with affordable rates, diverse options, and flexible bookings. Enjoy reliable, feature-packed vehicles for every journey, ensuring comfort, convenience, and customer satisfaction.</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-[#809DA5] pt-6 text-center text-[#809DA5]">
          <p>© Copyright RideXpress. All Rights Reserved</p>
          <p>Designed by <a href="https://github.com/arahman225" className="text-[#CDF7FF] hover:text-[#cdf7ffb7]">Abdurrahman</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;