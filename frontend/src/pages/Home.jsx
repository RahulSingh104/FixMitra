// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// import { motion } from "framer-motion";
// import ServicePreview from "@/components/services/ServicePreview"


// const MotionDiv = motion.div;


// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col">
//       <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100">
//         {/* Floating blur circles */}
//         <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl relative z-10"
//         >
//           Book Trusted Professionals <br />
//           <span className="text-indigo-600">Instantly Near You</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-gray-600 text-lg max-w-2xl mb-10 relative z-10"
//         >
//           Reliable home services with verified professionals and secure
//           payments.
//         </motion.p>

//         <div className="flex gap-4 relative z-10">
//           <Button size="lg" onClick={() => navigate("/services")}>
//             Explore Services
//           </Button>

//           <Button
//             size="lg"
//             variant="outline"
//             onClick={() => navigate("/register")}
//           >
//             Become a Provider
//           </Button>
//         </div>
//       </section>

//       {/* WHY US SECTION */}
//       <section className="py-20 bg-muted">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
//           <div className="text-center">
//             <h3 className="text-xl font-semibold mb-3">
//               Verified Professionals
//             </h3>
//             <p className="text-gray-500">
//               All providers are background checked and verified.
//             </p>
//           </div>

//           <div className="text-center">
//             <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
//             <p className="text-gray-500">
//               Safe and secure online payment integration.
//             </p>
//           </div>

//           <div className="text-center">
//             <h3 className="text-xl font-semibold mb-3">Real Reviews</h3>
//             <p className="text-gray-500">
//               Transparent ratings and feedback from customers.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>

//         <Button size="lg" onClick={() => navigate("/services")}>
//           Book a Service Now
//         </Button>
//       </section>
//     </div>
//   );
// }



import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, ShieldCheck, Clock, Users } from "lucide-react"

const MotionDiv = motion.div

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">

        {/* Floating Background Blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400 rounded-full blur-3xl opacity-20"></div>

        <MotionDiv
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl relative z-10 leading-tight"
        >
          Book Trusted Professionals <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Instantly Near You
          </span>
        </MotionDiv>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-lg max-w-2xl mb-10 relative z-10"
        >
          Verified providers. Transparent pricing. Secure payments.
          Everything you need for reliable home services.
        </motion.p>

        <div className="flex gap-4 relative z-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
            onClick={() => navigate("/services")}
          >
            Explore Services
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/register")}
          >
            Become a Provider
          </Button>
        </div>

      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center px-6">

          <Stat icon={<Users />} number="1,200+" label="Happy Customers" />
          <Stat icon={<ShieldCheck />} number="450+" label="Verified Professionals" />
          <Stat icon={<Clock />} number="24/7" label="Service Availability" />
          <Stat icon={<Star />} number="4.8" label="Average Rating" />

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Browse Services"
              desc="Find trusted professionals in your area."
            />
            <Step
              number="2"
              title="Book Instantly"
              desc="Schedule a service at your convenience."
            />
            <Step
              number="3"
              title="Secure Payment"
              desc="Pay safely after service completion."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to book your first service?
        </h2>

        <Button
          size="lg"
          className="bg-white text-indigo-600 hover:bg-gray-100"
          onClick={() => navigate("/services")}
        >
          Get Started Now
        </Button>
      </section>

    </div>
  )
}

/* ================= Reusable Components ================= */

function Stat({ icon, number, label }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-center text-indigo-600">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{number}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  )
}

function Step({ number, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>
      <p className="text-gray-500">
        {desc}
      </p>
    </div>
  )
}
