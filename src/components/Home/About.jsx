import Container from "../shared/Container";


const About = () => {
  return (
    <section className="py-20 bg-base-100">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content & Mission */}
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                Our Mission
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Making Caregiving Easy, <br /> 
              <span className="text-blue-600">Secure & Accessible</span> for Everyone.
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              At Care.xyz, we understand that finding a trusted person to look after your 
              loved ones is a huge responsibility. Our platform connects you with 
              vetted, compassionate professionals who treat your family like their own.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-800">Verified & Background Checked Carers</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-800">Fast & Secure Online Booking</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-800">Affordable Pricing with No Hidden Fees</p>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Stats Card */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:bg-blue-50 hover:border-blue-100 transition duration-300">
                <h3 className="text-4xl font-black text-blue-600 mb-2">100%</h3>
                <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Trusted Safety</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:bg-blue-50 hover:border-blue-100 transition duration-300">
                <h3 className="text-4xl font-black text-blue-600 mb-2">5k+</h3>
                <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Happy Families</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:bg-blue-50 hover:border-blue-100 transition duration-300">
                <h3 className="text-4xl font-black text-blue-600 mb-2">1k+</h3>
                <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Certified Carers</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:bg-blue-50 hover:border-blue-100 transition duration-300">
                <h3 className="text-4xl font-black text-blue-600 mb-2">24/7</h3>
                <p className="text-slate-500 font-medium uppercase text-xs tracking-wider">Support Ready</p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default About;