import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const teamData = [
  {
    name: "Alex Smith",
    role: "Creative Leader",
    description:
      "Driving innovation in car rental services with excellence and passion.",
    img: "https://i.ibb.co.com/rccbv9R/team-3.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sophia Johnson",
    role: "Customer Support",
    description:
      "Ensuring customer satisfaction with 24/7 assistance and problem-solving.",
    img: "https://i.ibb.co.com/DLjRP9Z/customer2.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Michael Brown",
    role: "Operations Manager",
    description: "Streamlining operations to provide seamless rental services.",
    img: "https://i.ibb.co.com/mXp0G39/customer1.jpg",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Emma Williams",
    role: "Marketing Specialist",
    description: "Promoting the brand to connect with our valued customers.",
    img: "https://i.ibb.co.com/jMXKwkR/user2.png",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "James Taylor",
    role: "Technical Lead",
    description: "Ensuring technology drives superior rental experiences.",
    img: "https://i.ibb.co.com/J3zwj6n/team-image-5.png",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Olivia Davis",
    role: "Fleet Manager",
    description: "Maintaining a diverse, well-serviced fleet for every need.",
    img: "https://i.ibb.co.com/mGCW77M/team-image-6.png",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

const OurTeam = () => {
  return (
    <div className=" py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeIn">
            Meet Our Team
          </h2>
          <p className="text-gray-600">
            Dedicated to providing the best car rental experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl  shadow-2xl p-6 text-center transform group transition-transform duration-300 hover:-translate-y-3 "
            >
              {/* Profile Image */}
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 group-hover:border-blue-400 transition-all duration-300 mb-4">
                <img
                  src={member.img}
                  alt={`${member.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-gray-600 font-medium mt-2">{member.role}</p>

              {/* Description */}
              <p className="text-gray-500 mt-4">{member.description}</p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href={member.socials.facebook}
                  className="text-blue-500 transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href={member.socials.twitter}
                  className="text-blue-400 transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href={member.socials.instagram}
                  className="text-pink-500 transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href={member.socials.linkedin}
                  className="text-blue-700 transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
