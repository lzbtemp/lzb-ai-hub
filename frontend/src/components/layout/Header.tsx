import { Link, useNavigate } from 'react-router-dom';
import GradientMenu from '@/components/ui/gradient-menu';
import { TextRoll } from '@/components/ui/text-roll';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/lazboy-logo.png"
              alt="La-Z-Boy"
              className="h-10"
            />
            <span className="border-l border-[#1B3A6B]/15 pl-3">
              <TextRoll
                className="text-lg font-bold text-[#1B3A6B] tracking-tight"
                duration={0.6}
                getEnterDelay={(i) => i * 0.05}
                getExitDelay={(i) => i * 0.05 + 0.12}
                loop
                loopDelay={4}
              >
                Agent Skills Hub
              </TextRoll>
            </span>
          </Link>

          <nav className="flex items-center">
            <GradientMenu onNavigate={(href) => navigate(href)} />
          </nav>
        </div>
      </div>
    </header>
  );
}
