import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const Landing = () => {
  
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-50 text-slate-900 selection:bg-slate-200">
      <div className="container mx-auto grid h-full grid-cols-1 items-center px-6 lg:grid-cols-2 lg:gap-12">
        
        {/* Left Column: Content */}
        <div className="flex flex-col items-start justify-center space-y-8 py-12 lg:py-0">
          <div className="flex items-center space-x-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all hover:ring-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>I want to learn</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              DECKY, <br />
              <span className="text-slate-400">just a proyect.</span>
            </h1>
            <p className="max-w-md text-lg text-slate-500 sm:text-xl">
              Anki-style spaced repetition meets modern design. Retain information forever with 5 minutes a day.
            </p>
          </div>

          <div className="flex w-full flex-col space-y-3 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" className="h-14 bg-slate-900 px-8 text-base text-white hover:bg-slate-800" asChild>
              <Link to="/signup" className="flex items-center space-x-2">
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="h-14 px-8 text-base text-slate-600 hover:bg-white" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Right Column: Visual Stack */}
        <div className="relative hidden h-full items-center justify-center lg:flex">
          <div className="relative h-[450px] w-full max-w-md">
            {/* Card 3 (Bottom) */}
            <div className="absolute inset-0 translate-x-12 translate-y-12 rotate-6 rounded-3xl border border-slate-200 bg-white/40 shadow-sm backdrop-blur-sm"></div>
            
            {/* Card 2 (Middle) */}
            <div className="absolute inset-0 translate-x-6 translate-y-6 rotate-3 rounded-3xl border border-slate-200 bg-white/60 shadow-md backdrop-blur-sm"></div>
            
            {/* Card 1 (Top) - Now Interactive */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center space-y-6 rounded-3xl border border-slate-200 bg-white p-12 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-slate-100">
                {isFlipped ? (
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                ) : (
                  <Sparkles className="h-6 w-6 text-slate-900" />
                )}
              </div>
              <div className="text-center">
                <p className={`text-xs font-semibold uppercase tracking-widest ${isFlipped ? "text-emerald-500" : "text-slate-400"}`}>
                  {isFlipped ? "Answer" : "Question"}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {isFlipped ? "Reviewing information at increasing intervals." : "What is Spaced Repetition?"}
                </h2>
              </div>
              <div className="w-full space-y-3 pt-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full transition-all duration-1000 ${isFlipped ? "w-full bg-emerald-500" : "w-2/3 bg-slate-900 group-hover:w-full"}`}></div>
                </div>
                <p className="text-center text-sm font-medium tracking-wide text-slate-400">
                  {isFlipped ? "Reviewed just now" : "Next review: 4 days"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-slate-200/50 to-transparent blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Landing;