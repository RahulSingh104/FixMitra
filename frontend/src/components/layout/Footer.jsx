import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-xl font-bold mb-4">FixMitra</h3>
          <p className="text-gray-400">
            Trusted professionals for every home need.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Cleaning</li>
            <li>Repair</li>
            <li>Beauty</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-gray-400">
            <Facebook />
            <Instagram />
            <Linkedin />
            <Twitter />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} FixMitra. All rights reserved.
      </div>
    </footer>
  )
}
