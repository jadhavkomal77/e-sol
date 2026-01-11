
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useGetPublicFooterQuery } from "../redux/apis/footerApi";

const Social = ({ href, children }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-xl bg-white/10 border border-white/10
      flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition"
    >
      {children}
    </a>
  );
};

export default function Footer({ slug }) {
  const { data, isLoading } = useGetPublicFooterQuery(slug);
  const footer = data?.data;

  if (isLoading || !footer) return null;

  const year = new Date().getFullYear();

  const allLinks =
    footer.links?.filter((l) => l.isActive).sort((a, b) => a.order - b.order) ||
    [];

  const quickLinks = allLinks.filter((l) => l.type === "quick");
  const importantLinks = allLinks.filter((l) => l.type === "important");

  const resolveUrl = (url) =>
    url.startsWith("http") ? url : `/${url.replace(/^\/+/, "")}`;

  return (
    <footer className="bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold mb-3">
            {footer.brandText}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {footer.copyrightText}
          </p>

          <div className="flex gap-3">
            <Social href={footer.socialLinks?.facebook}><Facebook size={18} /></Social>
            <Social href={footer.socialLinks?.twitter}><Twitter size={18} /></Social>
            <Social href={footer.socialLinks?.instagram}><Instagram size={18} /></Social>
            <Social href={footer.socialLinks?.linkedin}><Linkedin size={18} /></Social>
          </div>
        </div>

        {/* QUICK LINKS */}
        {quickLinks.length > 0 && (
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {quickLinks.map((l) => (
                <li key={l._id}>
                  <a href={resolveUrl(l.url)} className="hover:text-blue-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* IMPORTANT LINKS */}
        {importantLinks.length > 0 && (
          <div>
            <h4 className="font-semibold mb-4">Important Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {importantLinks.map((l) => (
                <li key={l._id}>
                  <a href={resolveUrl(l.url)} className="hover:text-blue-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            {footer.contact?.phone && (
              <li className="flex gap-2">
                <Phone size={15} /> {footer.contact.phone}
              </li>
            )}
            {footer.contact?.email && (
              <li className="flex gap-2 break-all">
                <Mail size={15} /> {footer.contact.email}
              </li>
            )}
            {footer.contact?.address && (
              <li className="flex gap-2">
                <MapPin size={15} /> {footer.contact.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {year} {footer.brandText}. All Rights Reserved.
        {footer.showDevelopedBy && footer.developedByText && (
          <div className="mt-1 text-blue-400">
            {footer.developedByText}
          </div>
        )}
      </div>
      {/* ADMIN LOGIN BUTTON */}
<div className="pb-6">
  <Link
    to={`/adminlogin?slug=${slug}`}
    className="
      inline-flex items-center justify-center
      px-5 py-2.5 rounded-lg
      bg-blue-600 text-white
      text-sm font-semibold
      hover:bg-blue-800
      transition-all
    "
  >
    Admin Login
  </Link>
</div>

    </footer>
  );
}
