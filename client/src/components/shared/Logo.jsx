import { Cog, PenTool as Tool, Wrench } from 'lucide-react';

export default function Logo({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <Cog size={28} className="text-blue-700" />
        <Tool size={16} className="absolute text-orange-500" style={{ top: -3, right: -3 }} />
        <Wrench size={14} className="absolute text-teal-500" style={{ bottom: -2, left: -2 }} />
      </div>
    </div>
  );
}
