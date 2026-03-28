import { Link } from 'react-router-dom';
import { ArrowRight, Server } from 'lucide-react';
import type { McpServer } from '../../types';

interface Props {
  server: McpServer;
}

export default function McpCard({ server }: Props) {
  return (
    <Link
      to={`/mcp/${server.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover hover:border-[#1B3A6B]/15 h-full"
    >
      {/* Accent stripe — sage green to distinguish from skills */}
      <div className="h-0.5 bg-gradient-to-r from-[#8FAF8A] via-[#8FAF8A]/60 to-transparent" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-[#2C2C2C] line-clamp-1 group-hover:text-[#1B3A6B] transition-colors tracking-tight">
            {server.name}
          </h3>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8FAF8A] shrink-0 bg-[#8FAF8A]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Server className="w-3 h-3" />
            MCP
          </span>
        </div>

        <p className="text-sm text-[#2C2C2C]/55 line-clamp-2 mb-5 leading-relaxed flex-1">
          {server.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#1B3A6B]/12 to-[#1B3A6B]/8 text-[#1B3A6B]">
            {server.category}
          </span>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-[#2C2C2C]/35">
          <span className="font-medium">{server.owner}</span>
          <div className="flex items-center gap-2">
            {server.version && <span>v{server.version}</span>}
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#1B3A6B]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
