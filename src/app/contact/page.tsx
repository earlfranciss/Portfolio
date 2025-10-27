import Image from "next/image";
import { ContactData } from "../../lib/ContactData";

export default function Contact() {
  return (
        <section className="relative space-y-6 pt-6 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

      <h2 className="text-2xl font-bold text-center">Contact</h2>

      <div className="flex gap-6 flex-wrap justify-center">
        {ContactData.map((contact) => (
          <a
            key={contact.id}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={contact.logo}
              alt="contact logo"
              width={40}
              height={40}
              unoptimized  // <-- 👈 add this
            />
          </a>
        ))}
      </div>
    </section>
  );
}
