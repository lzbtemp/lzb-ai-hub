import { Link } from 'react-router-dom';
import { ArrowRight, Server } from 'lucide-react';
import type { FlatTool } from '../../types';

interface Props {
  tool: FlatTool;
}

export default function ToolCard({ tool }: Props) {
  return (
    <Link
      to={`/mcp/${tool.serverSlug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover hover:border-[#1B3A6B]/15 h-full"
    >
      {/* Accent stripe — red/coral to distinguish from skills (navy) and MCP (sage) */}
      <div className="h-0.5 bg-gradient-to-r from-[#C0392B] via-[#C0392B]/60 to-transparent" />

      <div className="p-6 flex flex-col flex-1">
        {/* Tool name as monospace */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <code className="text-sm font-mono font-bold text-[#1B3A6B] bg-[#1B3A6B]/8 px-2.5 py-1 rounded-lg line-clamp-1">
            {tool.name}
          </code>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#C0392B]/70 shrink-0 bg-[#C0392B]/8 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Tool
          </span>
        </div>

        <p className="text-sm text-[#2C2C2C]/55 line-clamp-2 mb-5 leading-relaxed flex-1">
          {tool.description}
        </p>

        {/* Category badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#1B3A6B]/12 to-[#1B3A6B]/8 text-[#1B3A6B]">
            {tool.category}
          </span>
        </div>

        {/* Footer — parent MCP server */}
        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-[#2C2C2C]/35">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Server className="w-3 h-3 text-[#8FAF8A]/60" />
            {tool.serverName}
          </span>
          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#1B3A6B]" />
        </div>
      </div>
    </Link>
  );
}
