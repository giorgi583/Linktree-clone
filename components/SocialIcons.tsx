import {
  FaInstagram,
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
  FaTelegram
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socialIcons: Record<string, React.JSX.Element> = {
  telegram: <FaTelegram className="w-6 h-6" />,
  instagram: <FaInstagram className="w-6 h-6" />,
  x: <FaXTwitter className="w-6 h-6" />,
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