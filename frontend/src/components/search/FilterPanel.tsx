import {
  Code2, Server, TestTube2, Shield, BarChart3, Brain,
  Layout, Database, Cloud, FileText, Palette, Briefcase, Layers
} from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

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

interface Props {
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function FilterPanel({ selectedCategory, onCategoryChange }: Props) {
  const { data: categories } = useCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-[#1B3A6B]/70 uppercase tracking-[0.15em]">Categories</h3>
        {selectedCategory && (
          <button
            onClick={() => onCategoryChange('')}
            className="text-xs text-[#C0392B] hover:text-[#C0392B]/70 transition-colors font-medium"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-0.5">
        <button
          onClick={() => onCategoryChange('')}
          className={`group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
            !selectedCategory
              ? 'bg-[#1B3A6B] text-white font-medium shadow-md shadow-[#1B3A6B]/20'
              : 'text-[#2C2C2C]/55 hover:bg-[#1B3A6B]/5 hover:text-[#2C2C2C]/80'
          }`}
        >
          <Layers className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${!selectedCategory ? 'text-white/80' : ''}`} />
          All
        </button>
        {categories?.map((cat) => {
          const Icon = ICON_MAP[cat.icon || ''] || Code2;
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#1B3A6B] text-white font-medium shadow-md shadow-[#1B3A6B]/20'
                  : 'text-[#2C2C2C]/55 hover:bg-[#1B3A6B]/5 hover:text-[#2C2C2C]/80'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white/80' : ''}`} />
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
