import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Flame, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Good morning, Dave</h2>
          <p className="text-slate-500">You have 42 cards to review today.</p>
        </div>
        <Button className="bg-slate-900 text-white hover:bg-slate-800 px-6">
          Start Session
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Daily Streak" 
          value="12 Days" 
          icon={<Flame className="h-4 w-4 text-orange-500" />} 
          description="Keep it up!"
        />
        <StatsCard 
          title="Cards Mastered" 
          value="1,240" 
          icon={<Brain className="h-4 w-4 text-purple-500" />} 
          description="Total SRS memory"
        />
        <StatsCard 
          title="Next Review" 
          value="2h 15m" 
          icon={<Clock className="h-4 w-4 text-blue-500" />} 
          description="Scheduled session"
        />
        <StatsCard 
          title="Retention" 
          value="94%" 
          icon={<Calendar className="h-4 w-4 text-emerald-500" />} 
          description="Accuracy last 7 days"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Decks */}
        <Card className="col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Decks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <DeckItem name="Spanish Vocabulary" count={24} color="bg-orange-100 text-orange-700" />
              <DeckItem name="JavaScript Fundamentals" count={12} color="bg-blue-100 text-blue-700" />
              <DeckItem name="Medical Terminology" count={6} color="bg-emerald-100 text-emerald-700" />
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-100"
                  fill="none"
                  strokeWidth="3.8"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-slate-900"
                  fill="none"
                  strokeDasharray="75, 100"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">75%</span>
                <span className="text-[10px] uppercase text-slate-400">Goal</span>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500 px-4">
              You've reviewed <span className="font-bold text-slate-900">450</span> cards this week.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function StatsCard({ title, value, icon, description }: any) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <p className="text-[10px] font-medium text-slate-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function DeckItem({ name, count, color }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 flex items-center justify-center rounded-lg font-bold ${color}`}>
          {name.charAt(0)}
        </div>
        <span className="font-medium text-slate-700">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-900">{count} cards</span>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;