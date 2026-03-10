export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-[#06080F] overflow-x-hidden pb-20">
      
      {/* 1. Header Skeleton */}
      <header className="px-8 py-12 md:px-16 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 w-full md:w-auto">
            {/* Title block */}
            <div className="h-14 w-3/4 md:w-96 bg-[#1E293B] rounded animate-pulse" />
            <div className="h-4 w-64 bg-[#1E293B] rounded animate-pulse" />
          </div>
          
          {/* Stats blocks */}
          <div className="flex gap-4">
             <div className="h-24 w-24 bg-[#1E293B] rounded animate-pulse" />
             <div className="h-24 w-24 bg-[#1E293B] rounded animate-pulse" />
          </div>
        </div>
      </header>

      {/* 2. Content Skeleton */}
      <div className="px-8 py-12 md:px-16 max-w-6xl mx-auto space-y-8">
        
        {/* Section Title */}
        <div className="h-6 w-48 bg-[#1E293B] rounded animate-pulse mb-8" />

        {/* 3. Card Skeletons (We render 3 fake cards to look like a list) */}
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="bg-[#0B101E] border border-[#1E293B] rounded-2xl p-6 md:p-8"
          >
            {/* Card Header */}
            <div className="flex justify-between mb-6">
              <div className="h-6 w-24 bg-[#1E293B] rounded animate-pulse" />
              <div className="h-4 w-24 bg-[#1E293B] rounded animate-pulse" />
            </div>
            
            {/* Card Title & User */}
            <div className="h-8 w-3/4 md:w-1/2 bg-[#1E293B] rounded animate-pulse mb-4" />
            <div className="h-4 w-1/3 bg-[#1E293B] rounded animate-pulse mb-8" />
            
            {/* Card Description Lines */}
            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-[#1E293B] rounded animate-pulse" />
              <div className="h-4 w-full bg-[#1E293B] rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-[#1E293B] rounded animate-pulse" />
            </div>
            
            {/* Textarea/Form Block */}
            <div className="h-32 w-full bg-[#1E293B]/50 border border-[#1E293B] rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}