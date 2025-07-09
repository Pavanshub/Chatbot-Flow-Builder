'use client';

import React, { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SettingsPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: any) => void;
  onClose: () => void;
}

export function SettingsPanel({ node, onUpdateNode, onClose }: SettingsPanelProps) {
  const [text, setText] = useState(node.data.text || '');

  // Update local state when node changes
  useEffect(() => {
    setText(node.data.text || '');
  }, [node.data.text]);

  // Handle text change with immediate update
  const handleTextChange = (newText: string) => {
    setText(newText);
    onUpdateNode(node.id, { text: newText });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Message</h2>
        </div>
      </div>

      {/* Settings Form */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="message-text" className="text-sm font-medium text-gray-700 mb-2 block">
            Text
          </Label>
          <Textarea
            id="message-text"
            placeholder="Enter your message..."
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        {/* Node Info */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Node Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Node ID:</span>
              <span className="font-mono text-gray-700">{node.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className="text-gray-700">Text Message</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Position:</span>
              <span className="text-gray-700">
                {Math.round(node.position.x)}, {Math.round(node.position.y)}
              </span>
            </div>
          </div>
        </div>

        {/* Future settings can be added here */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Advanced Settings</h3>
          <p className="text-sm text-gray-500">
            Additional configuration options will be available here in future updates.
          </p>
        </div>
      </div>
    </div>
  );
}