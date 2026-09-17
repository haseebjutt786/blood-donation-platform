import Link from "next/link"
import Image from "next/image"

const causes = [
  {
    img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&auto=format&fit=crop&q=80",
    tag: "Ongoing Need",
    title: "Thalassemia Patients",
    detailHref: "/causes/thalassemia",
    desc: "Thalassemia is a genetic blood disorder that prevents the body from producing healthy red blood cells. Patients — many of them children — require regular blood transfusions every two to four weeks simply to stay alive. Without a reliable, accessible supply of matched blood, their survival is at constant risk.",
    href: "/donors",
    color: "bg-red-600",
    cta: "Find a Donor",
  },
  {
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&auto=format&fit=crop&q=80",
    tag: "Emergency",
    title: "Accident & Trauma Victims",
    detailHref: "/causes/accident-trauma",
    desc: "Severe road accidents and trauma injuries cause massive blood loss that requires immediate transfusion to prevent death. In emergencies, hospitals need large quantities of compatible blood within hours. A donor registered nearby and reachable instantly can be the deciding factor between survival and loss.",
    href: "/requests",
    color: "bg-orange-600",
    cta: "Post a Request",
  },
  {
    img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&auto=format&fit=crop&q=80",
    tag: "Surgical",
    title: "Surgery & Cancer Patients",
    detailHref: "/causes/surgery-cancer",
    desc: "Patients undergoing major surgeries, cancer treatment including chemotherapy, or bone marrow transplants often require significant blood support throughout their care. Blood availability directly affects whether complex procedures can be safely performed, particularly in hospitals that cannot maintain large standing reserves.",
    href: "/donors/register",
    color: "bg-blue-600",
    cta: "Register as Donor",
  },
  {
    // Fixed: previous URL returned a 404. Using a reliable maternity/newborn care image.
    img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&auto=format&fit=crop&q=80",
    tag: "Maternity",
    title: "Mothers in Childbirth",
    detailHref: "/causes/mothers-childbirth",
    desc: "Severe bleeding during or after childbirth is a leading cause of maternal death, particularly in areas where blood banks are limited or inaccessible. Having a registered donor who can be contacted quickly and reach a nearby hospital in time can directly save a mother's life and protect her newborn.",
    href: "/donors/register",
    color: "bg-pink-600",
    cta: "Become a Donor",
  },
]

export default function Causes() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
            Why It Matters
          </span>
          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Who Needs Your Blood
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Every blood group is needed. Every donation matters. These are the people whose lives
            depend on donors like you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {causes.map(c => (
            <div
              key={c.title}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <Image
                  src={c.img}
                  alt={`${c.title} — blood donation needed`}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <span className={`absolute left-4 top-4 rounded-full ${c.color} px-3 py-1 text-xs font-bold text-white`}>
                  {c.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Title — now links to detail page */}
                <Link
                  href={c.detailHref}
                  className="text-lg font-bold text-gray-900 transition hover:text-red-600 hover:underline decoration-red-300 underline-offset-2"
                >
                  {c.title}
                </Link>
                <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">{c.desc}</p>
                {/* Action CTA — unchanged, links to form */}
                <Link
                  href={c.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 transition hover:gap-3 hover:text-red-700"
                >
                  {c.cta}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
