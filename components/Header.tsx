'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Bot } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
}

export function Header({ onSave }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Chatbot Flow Builder</h1>
            <p className="text-sm text-gray-500">Design your conversation flow</p>
          </div>
        </div>
        
        <Button onClick={onSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </header>
  );
}