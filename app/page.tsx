

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">
           Welcome to <span>
    <span className="bg-gradient-to-r from-[#00ff00] to-[#005500] bg-clip-text text-transparent">
      Up
    </span>
    <span className="bg-gradient-to-r from-[#cccccc] via-[#888888] to-[#ffffff] bg-clip-text text-transparent">
      Cyclica
    </span>
  </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered food waste management that transforms trash into value.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/submit-waste"
            className="btn btn-primary"
          >
            Get Started
          </a>
          <a
            href="/dashboard"
            className="btn btn-secondary bg-gradient-to-r from-[#cccccc] via-[#888888] to-[#ffffff] bg-clip-text text-transparent border border-border"
          >
            View Dashboard
          </a>
        </div>
      </div>
      
    </main>
   
  );
}
