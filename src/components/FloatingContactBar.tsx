"use client";

import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";

export default function FloatingContactBar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div 
      className={`floating-contact-bar hidden sm:flex ${
        isAdmin ? "!right-4 !bottom-4 !gap-2" : ""
      }`}
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/919044601602?text=Hello%20I%20have%20an%20enquiry"
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-contact-btn bg-[#25D366] hover:bg-[#20ba59] border border-white/20 ${
          isAdmin ? "!w-10 !h-10" : ""
        }`}
        title="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          width={isAdmin ? "18" : "22"} 
          height={isAdmin ? "18" : "22"} 
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436 0 9.85-4.414 9.853-9.853.002-2.634-1.02-5.11-2.881-6.974C16.483 1.914 14.004.889 11.37.889c-5.44 0-9.856 4.415-9.859 9.857-.001 1.637.432 3.23 1.252 4.636l-.993 3.627 3.72-.975zm12.316-5.834c-.334-.167-1.97-.975-2.274-1.087-.305-.113-.527-.168-.748.163-.221.33-.856 1.087-1.048 1.31-.191.223-.383.248-.717.08-1.353-.679-2.317-1.189-3.21-2.72-.236-.405.236-.376.677-1.258.074-.15.038-.282-.019-.393-.056-.113-.527-1.272-.722-1.74-.19-.459-.382-.397-.527-.404-.136-.007-.292-.008-.448-.008-.156 0-.411.059-.626.292-.215.233-.821.803-.821 1.957 0 1.153.84 2.271.956 2.422.118.152 1.652 2.528 4 3.527 1.62.697 2.296.81 3.125.688.508-.075 1.565-.64 1.787-1.259.223-.62.223-1.154.156-1.26-.067-.107-.248-.168-.582-.335z"/>
        </svg>
      </a>

      {/* Call */}
      <a
        href="tel:+919044601602"
        className={`floating-contact-btn bg-brand-orange hover:bg-orange-600 border border-white/20 ${
          isAdmin ? "!w-10 !h-10" : ""
        }`}
        title="Call Now"
      >
        <Phone className={isAdmin ? "w-4.5 h-4.5" : "w-5.5 h-5.5"} />
      </a>

      {/* Mail */}
      <a
        href="mailto:support@nighwan.com"
        className={`floating-contact-btn bg-brand-teal hover:bg-teal-700 border border-white/20 ${
          isAdmin ? "!w-10 !h-10" : ""
        }`}
        title="Email Support"
      >
        <Mail className={isAdmin ? "w-4.5 h-4.5" : "w-5.5 h-5.5"} />
      </a>
    </div>
  );
}
