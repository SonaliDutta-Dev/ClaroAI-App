import { assets } from "../assets/assets";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director",
      content: "ClaroAI completely changed our content workflow. So fast and smooth.",
      rating: 4,
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator",
      content: "I save HOURS every week thanks to ClaroAI’s smart writing tools.",
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
      name: "David Lee",
      title: "Writer",
      content: "Clean UI, powerful features, and super fast. Love using this daily.",
      rating: 4,
    },
  ]

  return (
    <div className="px-6 sm:px-20 xl:px-32 py-24">

      <div className="text-center">
        <h2 className="text-[36px] sm:text-[42px] font-semibold text-[#222]">
          Loved by Creators
        </h2>
        <p className="text-[#555] max-w-lg mx-auto text-sm">
          Here's what our users say about their experience.
        </p>
      </div>

      <div className="flex flex-wrap justify-center mt-12 gap-8">
        {dummyTestimonialData.map((t, index) => (
          <div
            key={index}
            className="
              p-8 w-[270px] bg-white/70 backdrop-blur-xl border border-gray-200
              rounded-2xl shadow-[0_0_25px_rgba(180,150,255,0.15)]
              hover:scale-105 transition cursor-pointer
            "
          >
            <div className="flex gap-1">
              {Array(5).fill(0).map((_, i) => (
                <img
                  key={i}
                  src={i < t.rating ? assets.star_icon : assets.star_dull_icon}
                  className="w-4 h-4"
                />
              ))}
            </div>

            <p className="text-[#444] text-sm my-4">
              “{t.content}”
            </p>

            <div className="flex items-center gap-4 mt-5">
              <img src={t.image} className="w-12 h-12 rounded-full object-cover" />

              <div>
                <h3 className="font-medium text-[#222]">{t.name}</h3>
                <p className="text-xs text-[#555]">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Testimonial
