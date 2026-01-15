import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                G
              </div>
              <h2 className="text-xl font-semibold">GigFlow</h2>
            </div>

            <p className="text-gray-500 text-sm max-w-sm mb-6">
              A modern freelance marketplace to connect clients with skilled
              freelancers and help professionals get hired faster.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3">
              <SocialLink
                href="https://www.linkedin.com/in/rijwanln/"
                icon={<FaLinkedinIn />}
              />
              <SocialLink
                href="https://github.com/rijwanofficials"
                icon={<FaGithub />}
              />
              <SocialLink
                href="https://instagram.com/your_instagram_username"
                icon={<FaInstagram />}
              />
            </div>
          </div>

          {/* COLUMNS */}
        

          <FooterColumn
            title="For Freelancers"
            links={[
              "How to Find Work",
              "Direct Contracts",
              "Find Freelance Jobs",
              "Community",
              "Success Stories",
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              "Help & Support",
              "Trust & Safety",
              "Selling on GigFlow",
              "Buying on GigFlow",
              "Release Notes",
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              "About Us",
              "Leadership",
              "Investor Relations",
              "Careers",
              "Press",
            ]}
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <p>© 2026 GigFlow Inc. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-gray-700 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- HELPERS -------------------- */

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-medium mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-500">
        {links.map((link) => (
          <li
            key={link}
            className="hover:text-gray-800 cursor-pointer transition"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center
       text-gray-600 hover:bg-green-500 hover:text-white
transition"
    >
      {icon}
    </a>
  );
}

export default Footer;
