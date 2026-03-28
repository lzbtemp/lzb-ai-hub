import type { FlatTool } from '../types';
import mcpServers from './mcp-servers';

// Derive a flat, searchable catalog of all tools across all MCP servers
const allTools: FlatTool[] = mcpServers.flatMap((server) =>
  (server.tools ?? []).map((tool) => ({
    name: tool.name,
    description: tool.description,
    serverName: server.name,
    serverSlug: server.slug,
    category: server.category,
    owner: server.owner,
  })),
);

export default allTools;
