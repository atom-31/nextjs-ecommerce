export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Contact Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <div className="flex items-center mb-6">
            <span className="bg-red-500 p-3 rounded-full text-white mr-4">
              📞
            </span>
            <div>
              <h2 className="text-lg font-bold">Call To Us</h2>
              <p>We are available 24/7, 7 days a week.</p>
              <p className="font-semibold">Phone: +8801611122222</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex items-center">
            <span className="bg-red-500 p-3 rounded-full text-white mr-4">
              ✉️
            </span>
            <div>
              <h2 className="text-lg font-bold">Write To Us</h2>
              <p>Fill out our form, and we will contact you within 24 hours.</p>
              <p className="font-semibold">Email: customer@exclusive.com</p>
              <p className="font-semibold">Email: support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              required
              className="w-full p-3 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
