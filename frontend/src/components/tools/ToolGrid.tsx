import { Wrench } from 'lucide-react';
import type { FlatTool } from '../../types';
import ToolCard from './ToolCard';

interface Props {
  tools: FlatTool[];
}

export default function ToolGrid({ tools }: Props) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-[#1B3A6B]/5 flex items-center justify-center mx-auto mb-5">
          <Wrench className="w-8 h-8 text-[#1B3A6B]/20" />
        </div>
        <p className="text-lg font-medium text-[#2C2C2C]/40 mb-1">No tools found</p>
        <p className="text-sm text-[#2C2C2C]/25">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map((tool, i) => (
        <div key={`${tool.serverSlug}-${tool.name}`} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  );
}
