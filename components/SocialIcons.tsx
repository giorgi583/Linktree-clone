import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitch,
  FaSnapchat,
  FaReddit,
  FaPinterest,
  FaDiscord,
} from "react-icons/fa";

export const socialIcons: Record<string, React.JSX.Element> = {
  instagram: <FaInstagram className="w-6 h-6" />,
  twitter: <FaTwitter className="w-6 h-6" />,
  github: <FaGithub className="w-6 h-6" />,
  facebook: <FaFacebook className="w-6 h-6" />,
  linkedin: <FaLinkedin className="w-6 h-6" />,
  youtube: <FaYoutube className="w-6 h-6" />,
  tiktok: <FaTiktok className="w-6 h-6" />,
  twitch: <FaTwitch className="w-6 h-6" />,
  snapchat: <FaSnapchat className="w-6 h-6" />,
  reddit: <FaReddit className="w-6 h-6" />,
  pinterest: <FaPinterest className="w-6 h-6" />,
  discord: <FaDiscord className="w-6 h-6" />,
};