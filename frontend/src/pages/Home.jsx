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

// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Star, ShieldCheck, Clock, Users } from "lucide-react"
// import { useEffect, useState } from "react"
// import API from "@/api/api"

// const MotionDiv = motion.div

// export default function Home() {
//   const navigate = useNavigate()
//   const [categories, setCategories] = useState([])

// useEffect(() => {
//   const fetchCategories = async () => {
//     try {
//       const res = await API.get("/services/category")
//       setCategories(res.data)
//     } catch (err) {
//       console.error("Category fetch failed", err)
//     }
//   }

//   fetchCategories()
// }, [])

//   return (
//     <div className="flex flex-col overflow-hidden">

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">

//         {/* Floating Background Blobs */}
//         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-3xl opacity-20"></div>
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400 rounded-full blur-3xl opacity-20"></div>

//         <MotionDiv
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl relative z-10 leading-tight"
//         >
//           Book Trusted Professionals <br />
//           <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Instantly Near You
//           </span>
//         </MotionDiv>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-gray-600 text-lg max-w-2xl mb-10 relative z-10"
//         >
//           Verified providers. Transparent pricing. Secure payments.
//           Everything you need for reliable home services.
//         </motion.p>

//         <div className="flex gap-4 relative z-10">
//           <Button
//             size="lg"
//             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
//             onClick={() => navigate("/services")}
//           >
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

//       {/* ================= STATS SECTION ================= */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center px-6">

//           <Stat icon={<Users />} number="1,200+" label="Happy Customers" />
//           <Stat icon={<ShieldCheck />} number="450+" label="Verified Professionals" />
//           <Stat icon={<Clock />} number="24/7" label="Service Availability" />
//           <Stat icon={<Star />} number="4.8" label="Average Rating" />

//         </div>
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-6xl mx-auto text-center px-6">
//           <h2 className="text-3xl font-bold mb-12">
//             How It Works
//           </h2>

//           <div className="grid md:grid-cols-3 gap-12">
//             <Step
//               number="1"
//               title="Browse Services"
//               desc="Find trusted professionals in your area."
//             />
//             <Step
//               number="2"
//               title="Book Instantly"
//               desc="Schedule a service at your convenience."
//             />
//             <Step
//               number="3"
//               title="Secure Payment"
//               desc="Pay safely after service completion."
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="py-24 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//         <h2 className="text-3xl font-bold mb-6">
//           Ready to book your first service?
//         </h2>

//         <Button
//           size="lg"
//           className="bg-white text-indigo-600 hover:bg-gray-100"
//           onClick={() => navigate("/services")}
//         >
//           Get Started Now
//         </Button>
//       </section>

//     </div>
//   )
// }

// /* ================= Reusable Components ================= */

// function Stat({ icon, number, label }) {
//   return (
//     <div className="space-y-3">
//       <div className="flex justify-center text-indigo-600">
//         {icon}
//       </div>
//       <h3 className="text-2xl font-bold">{number}</h3>
//       <p className="text-gray-500">{label}</p>
//     </div>
//   )
// }

// function Step({ number, title, desc }) {
//   return (
//     <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
//       <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
//         {number}
//       </div>
//       <h3 className="text-xl font-semibold mb-2">
//         {title}
//       </h3>
//       <p className="text-gray-500">
//         {desc}
//       </p>
//     </div>
//   )
// }

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import API from "@/api/api";
import FeaturedServices from "@/components/home/FeaturedServices";
import Testimonials from "@/components/home/Testimonials";

const MotionDiv = motion.div;

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/services/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Category fetch failed", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* =========== HERO SECTION ============= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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

      {/* ========== CATEGORIES SECTION ===========*/}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Explore Categories</h2>

            <button
              onClick={() => navigate("/services")}
              className="text-indigo-600 font-medium hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: "Cleaning", icon: "🧹" },
              { name: "AC Repair", icon: "❄️" },
              { name: "Plumbing", icon: "🔧" },
              { name: "Electrician", icon: "⚡" },
              { name: "Painting", icon: "🎨" },
              { name: "Movers", icon: "🚚" },
            ].map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/services?category=${cat.name}`)}
                className="group cursor-pointer bg-gray-50 hover:bg-indigo-50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition">
                  {cat.icon}
                </div>

                <h3 className="font-semibold text-gray-700 group-hover:text-indigo-600">
                  {cat.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <FeaturedServices />
      </motion.div>

      {/* ======= STATS SECTION ========== */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center px-6">
          <Stat icon={<Users />} number="1,200+" label="Happy Customers" />
          <Stat
            icon={<ShieldCheck />}
            number="450+"
            label="Verified Professionals"
          />
          <Stat icon={<Clock />} number="24/7" label="Service Availability" />
          <Stat icon={<Star />} number="4.8" label="Average Rating" />
        </div>
      </motion.section>

      {/* ========= CATEGORIES SECTION ========== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center col-span-3">
                No categories available.
              </p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-10 text-center hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
                  onClick={() => navigate(`/services?category=${cat.id}`)}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {cat.name.charAt(0)}
                  </div>

                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* =========== HOW IT WORKS ============= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Browse Services"
              desc="Find trusted professionals."
            />
            <Step
              number="2"
              title="Book Instantly"
              desc="Schedule at your convenience."
            />
            <Step
              number="3"
              title="Secure Payment"
              desc="Pay safely after completion."
            />
          </div>
        </div>
      </section>

       {/* =========== TESTIMONIALS ============ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Testimonials />
      </motion.div>


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
  );
}

/* ================= Reusable Components ================= */

function Stat({ icon, number, label }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-center text-indigo-600">{icon}</div>
      <h3 className="text-2xl font-bold">{number}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}
