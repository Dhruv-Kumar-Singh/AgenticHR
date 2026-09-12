export default function MarqueeSection() {
  return (
    <section className="z-10 overflow-hidden group bg-[#000] border-white/10 border-t pt-40 pb-40 relative">
      <div className="flex flex-col items-center justify-center fade-up">
        {/* Marquee */}
        <div className="relative w-full overflow-hidden mb-24 flex items-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
            {['Diagnostics', 'Technical', 'Data', 'Analysis'].map((word, i) => (
              <h2
                key={i}
                className="text-[10vw] font-bold uppercase tracking-tighter mx-8"
                style={
                  i % 2 !== 0
                    ? { color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.8)' }
                    : { color: 'white' }
                }
              >
                {word}
              </h2>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="w-full max-w-6xl mx-auto -mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 relative z-10">
          {[
            {
              img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/468eeec1-e10c-4305-ad63-50cff0e023dc/1600w.png',
              tag: 'B2C Features',
              title: 'Candidate-Side',
              mt: '',
            },
            {
              img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/823f2b22-afcd-4c1d-b3f6-c025e505e98c/1600w.jpg',
              tag: 'B2B Features',
              title: 'Company-Side',
              mt: 'md:mt-24',
            },
          ].map(({ img, tag, title, mt }) => (
            <a
              key={title}
              href="#"
              className={`group/proj block relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl bg-[#050505] p-2 ${mt}`}
            >
              <div className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] px-3 py-1 rounded-full opacity-0 group-hover/proj:opacity-100 translate-y-2 group-hover/proj:translate-y-0 transition-all duration-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
              </div>
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-neutral-900">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover filter grayscale opacity-40 group-hover/proj:opacity-80 group-hover/proj:scale-105 transition-all duration-700 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover/proj:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-2 block opacity-0 group-hover/proj:opacity-100 transition-opacity duration-500">
                      {tag}
                    </span>
                    <h3 className="text-3xl font-semibold tracking-tight text-white">{title}</h3>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
