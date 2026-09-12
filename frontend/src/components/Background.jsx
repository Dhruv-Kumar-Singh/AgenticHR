export default function Background() {
  return (
    <>
      <div
        className="fixed top-0 w-full h-screen -z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 80%, transparent)',
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
      </div>
      <div className="bg-gradient-mesh opacity-80" />
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center px-6 md:px-12 select-none">
        <div className="w-full max-w-7xl h-full border-x border-white/[0.04] grid grid-cols-4 relative">
          <div className="border-r border-white/[0.04] h-full hidden md:block relative">
            <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[dataStream_3s_linear_infinite]" />
          </div>
          <div className="border-r border-white/[0.04] h-full hidden md:block relative">
            <div className="absolute top-[20%] right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[dataStream_4s_linear_infinite_1s]" />
          </div>
          <div className="border-r border-white/[0.04] h-full hidden md:block relative">
            <div className="absolute top-[60%] right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[dataStream_2.5s_linear_infinite_0.5s]" />
          </div>
        </div>
      </div>
    </>
  );
}
