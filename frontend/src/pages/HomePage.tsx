import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Search, ArrowRight, Code2, Server, TestTube2, Shield,
  BarChart3, Brain, Layout, Database, Cloud, FileText, Palette, Briefcase
} from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { useSkills } from '../hooks/useSkills';
import SkillGrid from '../components/skills/SkillGrid';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { Typewriter } from '@/components/ui/typewriter-text';
import { TextRotate } from '@/components/ui/text-rotate';

const ICON_MAP: Record<string, React.ElementType> = {
  code: Code2,
  server: Server,
  'check-circle': TestTube2,
  shield: Shield,
  database: BarChart3,
  cpu: Brain,
  layout: Layout,
  terminal: Database,
  cloud: Cloud,
  'file-text': FileText,
  figma: Palette,
  briefcase: Briefcase,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const { data: featuredSkills } = useSkills({ perPage: 6, sort: 'newest' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero with 3D Robot */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1B3A6B] via-[#152f58] to-[#0f2140] text-white">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#8FAF8A"
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center min-h-[320px]">
            {/* Left content */}
            <div className="flex-1 py-10 lg:py-14 z-10 text-center lg:text-left">
              <div className="mb-4 animate-fade-in-up min-h-[28px]">
                <Typewriter
                  text="Reusable capabilities for AI agents. Install with a single command and enhance your agents with procedural knowledge."
                  speed={50}
                  loop={false}
                  cursor="_"
                  className="text-base sm:text-lg text-white font-semibold tracking-wide"
                />
              </div>
              <div className="mb-6 animate-fade-in-up flex items-center gap-2 justify-center lg:justify-start" style={{ animationDelay: '0.08s' }}>
                <span className="text-sm text-white font-bold">Skills for</span>
                <TextRotate
                  texts={[
                    "Code Generation",
                    "API Integration",
                    "Data Analysis",
                    "Cloud Deployment",
                    "Testing & QA",
                    "Security Audits",
                  ]}
                  mainClassName="text-sm font-bold text-[#8FAF8A] overflow-hidden px-2 py-0.5 bg-[#8FAF8A]/10 rounded-md"
                  splitLevelClassName="overflow-hidden"
                  staggerFrom="last"
                  staggerDuration={0.025}
                  rotationInterval={2500}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </div>
              <div className="inline-block text-left">
                <p className="text-sm text-white/60 mb-2 animate-fade-in-up whitespace-nowrap" style={{ animationDelay: '0.12s' }}>
                  Discover, browse, and install AI agent skills built by your team.
                </p>

                {/* Glass search bar — matches text width */}
                <form onSubmit={handleSearch} className="relative animate-fade-in-up" style={{ animationDelay: '0.24s' }}>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-white bg-white/[0.08] backdrop-blur-md border border-white/[0.12] shadow-2xl placeholder-white/30 focus:outline-none focus:bg-white/[0.12] focus:border-white/[0.2] transition-all text-sm"
                  />
                </form>
              </div>
            </div>

            {/* Right — 3D Robot */}
            <div className="flex-1 relative h-[280px] lg:h-[320px] w-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Categories */}
        {categories && (
          <section className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold text-[#1B3A6B] tracking-tight">Browse by Category</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1B3A6B]/15 to-transparent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => {
                const Icon = ICON_MAP[cat.icon || ''] || Code2;
                return (
                  <Link
                    key={cat.id}
                    to={`/browse?category=${cat.slug}`}
                    className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 card-hover hover:border-[#1B3A6B]/20 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B3A6B]/10 to-[#1B3A6B]/5 flex items-center justify-center group-hover:from-[#1B3A6B]/20 group-hover:to-[#1B3A6B]/10 transition-all group-hover:scale-110 duration-300">
                      <Icon className="w-5.5 h-5.5 text-[#1B3A6B]" />
                    </div>
                    <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#1B3A6B] transition-colors">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Featured Skills */}
        {featuredSkills && featuredSkills.data.length > 0 && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-[#1B3A6B] tracking-tight">Latest Skills</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#1B3A6B]/15 to-transparent" />
              </div>
              <Link
                to="/browse"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#C0392B] hover:text-[#C0392B]/80 transition-colors"
              >
                View all <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <SkillGrid skills={featuredSkills.data} />
          </section>
        )}
      </div>
    </div>
  );
}
