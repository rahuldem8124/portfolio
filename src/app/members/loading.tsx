export default function MembersLoading() {
  return (
    <main className="relative min-h-screen bg-[#1a120b] overflow-x-hidden pb-20">
      {/* Old Film Visual Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/grain.png')] bg-repeat" />
      
      {/* Navigation Skeleton */}
      <nav className="relative z-20 p-8 flex justify-between items-center border-b border-[#2b1d15]/50">
        <div className="h-4 w-32 bg-[#2d1e14] rounded animate-pulse" />
        <div className="h-3 w-48 bg-[#2d1e14] rounded animate-pulse" />
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Title Skeleton */}
        <div className="flex justify-center mb-20">
          <div className="h-16 md:h-24 w-64 md:w-96 bg-[#2d1e14] rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: Project Request Form Skeleton */}
          <div className="lg:col-span-1 bg-[#2d1e14]/50 p-8 rounded-2xl border border-[#b85c38]/10 h-fit sticky top-24">
            <div className="h-6 w-48 bg-[#2d1e14] rounded animate-pulse mb-6" />
            <div className="h-4 w-full bg-[#2d1e14] rounded animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-[#2d1e14] rounded animate-pulse mb-8" />
            
            {/* Fake Form Inputs */}
            <div className="space-y-4">
              <div className="h-12 w-full bg-[#1a120b] border border-[#b85c38]/10 rounded-lg animate-pulse" />
              <div className="h-32 w-full bg-[#1a120b] border border-[#b85c38]/10 rounded-lg animate-pulse" />
              <div className="h-12 w-full bg-[#b85c38]/20 rounded-lg animate-pulse mt-4" />
            </div>
          </div>

          {/* RIGHT: Request History Skeleton */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="h-6 w-48 bg-[#2d1e14] rounded animate-pulse mb-8" />
              
              <div className="space-y-6">
                {/* Generate 2 fake history cards */}
                {[1, 2].map((i) => (
                  <div key={i} className="bg-black/20 border border-[#e5d3b3]/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-6 w-1/3 bg-[#2d1e14] rounded animate-pulse" />
                      <div className="h-5 w-24 bg-[#2d1e14] rounded-full animate-pulse" />
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="h-3 w-full bg-[#2d1e14] rounded animate-pulse" />
                      <div className="h-3 w-5/6 bg-[#2d1e14] rounded animate-pulse" />
                    </div>
                    
                    <div className="h-2 w-32 bg-[#2d1e14] rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </section>

            {/* Directory Skeleton */}
            <section className="pt-16 border-t border-[#b85c38]/10">
               <div className="h-8 w-64 bg-[#2d1e14] rounded animate-pulse mb-10" />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="h-24 w-full bg-[#2d1e14]/50 rounded animate-pulse" />
                 <div className="h-24 w-full bg-[#2d1e14]/50 rounded animate-pulse" />
               </div>
            </section>
          </div>
          
        </div>
      </div>
    </main>
  );
}