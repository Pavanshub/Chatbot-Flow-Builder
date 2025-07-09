'use client';

import React from 'react';
import { MessageCircle, Plus } from 'lucide-react';

// Node type configuration for extensibility
const nodeTypes = [
  {
    id: 'textNode',
    label: 'Message',
    icon: MessageCircle,
    description: 'Send a text message',
    color: 'bg-blue-100 text-blue-600',
  },
  // Future node types can be added here
  // {
  //   id: 'conditionNode',
  //   label: 'Condition',
  //   icon: GitBranch,
  //   description: 'Branch based on condition',
  //   color: 'bg-green-100 text-green-600',
  // },
];

export function NodesPanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Nodes Panel</h2>
        <p className="text-sm text-gray-500">Drag and drop nodes to build your flow</p>
      </div>
      
      <div className="space-y-3">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.id}
            draggable
            onDragStart={(event) => onDragStart(event, nodeType.id)}
            className="group cursor-move border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${nodeType.color}`}>
                <nodeType.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-700">
                  {nodeType.label}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-600">
                  {nodeType.description}
                </p>
              </div>
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Tips</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Drag nodes to the canvas to create them</li>
          <li>• Connect nodes by dragging from source to target</li>
          <li>• Click on a node to edit its properties</li>
          <li>• Each source can only have one connection</li>
        </ul>
      </div>
    </div>
  );
}