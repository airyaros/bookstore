import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

interface SocialMediaIconsListProps {
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
}

const SocialMediaIconsList: React.FC<SocialMediaIconsListProps> = ({
  twitterUrl,
  facebookUrl,
  instagramUrl,
}) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <a href={twitterUrl} className="text-purple-500">
        <FaTwitter size={24} />
      </a>
      <a href={facebookUrl} className="text-purple-500">
        <FaFacebook size={24} />
      </a>
      <a href={instagramUrl} className="text-purple-500">
        <FaInstagram size={24} />
      </a>
    </div>
  );
};

export default SocialMediaIconsList;
