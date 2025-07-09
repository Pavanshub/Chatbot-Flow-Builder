'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageCircle } from 'lucide-react';

interface TextNodeData {
  text: string;
}

export function TextNode({ data, selected }: NodeProps<any>) {
  return (
    <div className={`bg-white rounded-lg border-2 shadow-sm min-w-[200px] transition-all duration-200 ${
      selected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
    }`}>
      {/* Target handle - can accept multiple connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white hover:!bg-gray-500"
      />
      
      {/* Node header */}
      <div className="bg-teal-100 px-4 py-2 rounded-t-lg flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-teal-600" />
        <span className="text-sm font-medium text-teal-800">Send Message</span>
      </div>
      
      {/* Node content */}
      <div className="p-4">
        <p className="text-sm text-gray-700 leading-relaxed">{data.text}</p>
      </div>
      
      {/* Source handle - only one connection allowed */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white hover:!bg-blue-600"
      />
    </div>
  );
}