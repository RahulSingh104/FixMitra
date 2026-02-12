import { Card, CardContent } from "@/components/ui/card"
import { Star, ShieldCheck, BadgeCheck, Headphones } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aman Verma",
      review:
        "Amazing experience! The professional was on time and very skilled. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      review:
        "Super smooth booking process and secure payment. Loved the service quality!",
      rating: 4,
    },
    {
      name: "Rohit Patel",
      review:
        "Best platform for home services. Transparent pricing and trusted professionals.",
      rating: 5,
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-3">
            Real reviews from verified customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-sm hover:shadow-xl transition duration-300"
            >
              <CardContent className="p-8 space-y-4">

                {/* Stars */}
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="text-gray-600">
                  “{t.review}”
                </p>

                <h4 className="font-semibold">
                  — {t.name}
                </h4>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-10 text-center">

          <TrustItem
            icon={<ShieldCheck size={40} />}
            title="Secure Payments"
            desc="100% safe & encrypted transactions"
          />

          <TrustItem
            icon={<BadgeCheck size={40} />}
            title="Verified Professionals"
            desc="Background-checked service providers"
          />

          <TrustItem
            icon={<Headphones size={40} />}
            title="24/7 Support"
            desc="Always here to help you anytime"
          />

        </div>

      </div>
    </section>
  )
}

function TrustItem({ icon, title, desc }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center text-indigo-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">
        {title}
      </h3>
      <p className="text-gray-500">
        {desc}
      </p>
    </div>
  )
}
