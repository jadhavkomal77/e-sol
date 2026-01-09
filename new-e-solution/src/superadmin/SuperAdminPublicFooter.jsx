import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useGetPublicSuperAdminFooterQuery } from "../redux/apis/superAdminFooterApi";

/* Social Icon Wrapper */
const Social = ({ href, children }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-xl bg-white/10 border border-white/10
      flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all"
    >
      {children}
    </a>
  );
};

export default function SuperAdminPublicFooter() {
  const { data, isLoading } = useGetPublicSuperAdminFooterQuery();
  const footer = data?.data;

  if (isLoading || !footer) return null;

  const year = new Date().getFullYear();

  /* LINKS */
  const allLinks = Array.isArray(footer.links)
    ? footer.links
        .filter((l) => l.isActive && l.label && l.url)
        .sort((a, b) => a.order - b.order)
    : [];

  const quickLinks = allLinks.filter((l) => l.type === "quick");
  const importantLinks = allLinks.filter((l) => l.type === "important");

  /* URL handler (internal + external) */
  const renderLink = (url) => {
    if (url.startsWith("http")) return url;
    return `/${url.replace(/^\/+/, "")}`;
  };

  return (
    <footer className="bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-black text-white border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <div className="flex gap-4 items-center mb-4">
  <div
  className="
    w-14 h-14 rounded-xl
    bg-gradient-to-br from-blue-500 to-indigo-600
    flex items-center justify-center
    text-white text-2xl font-extrabold
    shadow-lg
  "
>
  {(footer.brandText && footer.brandText.trim().length > 0
    ? footer.brandText.trim().charAt(0)
    : "M"
  ).toUpperCase()}
</div>



            <div>
              <h3 className="text-xl font-bold capitalize">
                {footer.brandText || "Smart E Solutions"}
              </h3>
              <p className="text-blue-400 text-sm">
                {footer.copyrightText || "Technology & Security"}
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {footer.brandText
              ? `${footer.brandText} – reliable technology & security solutions.`
              : "Reliable technology & security solutions."}
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
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {quickLinks.map((l) => (
                <li key={l.order}>
                  <a
                    href={renderLink(l.url)}
                    className="hover:text-blue-400 transition"
                  >
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
            <h4 className="font-semibold text-lg mb-4">Important Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {importantLinks.map((l) => (
                <li key={l.order}>
                  <a
                    href={renderLink(l.url)}
                    target={l.url.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CONTACT INFO */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            {footer.contact?.phone && (
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-blue-400" />
                <a href={`tel:${footer.contact.phone}`}>
                  {footer.contact.phone}
                </a>
              </li>
            )}

            {footer.contact?.email && (
              <li className="flex items-center gap-2 break-all">
                <Mail size={15} className="text-blue-400" />
                <a href={`mailto:${footer.contact.email}`}>
                  {footer.contact.email}
                </a>
              </li>
            )}

            {footer.contact?.address && (
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-blue-400 mt-1" />
                {footer.contact.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {year} {footer.brandText || "Smart E Solutions"}. All Rights Reserved.
        {footer.showDevelopedBy && footer.developedByText && (
          <span className="block mt-1 text-blue-400 hover:underline">
            {footer.developedByText}
          </span>
        )}
      </div>
    </footer>
  );
}
