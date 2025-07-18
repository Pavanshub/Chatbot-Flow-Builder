# Chatbot Flow Builder

A modern, extensible chatbot flow builder built with React and React Flow. This application allows users to create, edit, and manage chatbot conversation flows through an intuitive drag-and-drop interface.

![Chatbot Flow Builder](https://img.shields.io/badge/React-18.2.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38B2AC)

## 🚀 Features

### Core Functionality
- **Visual Flow Builder**: Drag-and-drop interface for creating chatbot conversation flows
- **Text Nodes**: Support for text message nodes with customizable content
- **Node Connections**: Connect nodes with animated edges to define conversation flow
- **Real-time Editing**: Live editing of node properties through the settings panel
- **Flow Validation**: Built-in validation to ensure proper flow structure before saving

### User Interface
- **Nodes Panel**: Extensible panel housing all available node types
- **Settings Panel**: Context-sensitive panel for editing selected node properties
- **Interactive Canvas**: Smooth, responsive canvas with zoom, pan, and snap-to-grid functionality
- **Modern Design**: Clean, professional interface built with Tailwind CSS and shadcn/ui

### Technical Features
- **Extensible Architecture**: Modular design for easy addition of new node types
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Error Handling**: Comprehensive error handling with user-friendly notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript 5.2.2
- **UI Library**: React 18.2.0
- **Flow Builder**: React Flow (@xyflow/react) 12.8.1
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📋 Requirements Met

This project fulfills all the specified requirements from the BiteSpeed Frontend Task:

### ✅ Text Node
- [x] Supports text message nodes
- [x] Multiple text nodes can exist in one flow
- [x] Nodes added via drag-and-drop from Nodes Panel

### ✅ Nodes Panel
- [x] Houses all available node types
- [x] Currently supports Message Node
- [x] Extensible architecture for future node types

### ✅ Edge Connections
- [x] Connects nodes together with animated edges
- [x] Smooth step edge styling with blue color

### ✅ Source Handle
- [x] Source of connecting edges
- [x] **Enforced**: Only one edge can originate from a source handle
- [x] Visual feedback when attempting multiple connections

### ✅ Target Handle
- [x] Target of connecting edges
- [x] Can accept multiple incoming connections
- [x] Proper visual styling and hover states

### ✅ Settings Panel
- [x] Replaces Nodes Panel when a node is selected
- [x] Text field for editing selected node content
- [x] Real-time updates to node content
- [x] Node information display (ID, type, position)

### ✅ Save Button
- [x] Save button in header
- [x] **Validation**: Shows error if more than one node has empty target handles
- [x] Success notification on valid save
- [x] Proper error messaging for invalid flows

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot-flow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🎯 Usage

### Creating a Flow
1. **Add Nodes**: Drag the "Message" node from the Nodes Panel to the canvas
2. **Edit Content**: Click on a node to open the Settings Panel and edit its text
3. **Connect Nodes**: Drag from a source handle (bottom) to a target handle (top) of another node
4. **Save Flow**: Click the "Save Changes" button to validate and save your flow

### Flow Validation Rules
- Each source handle can only have **one outgoing connection**
- For flows with multiple nodes, only **one node can have an empty target handle** (the starting node)
- The system will show an error if these rules are violated

### Keyboard Shortcuts
- **Delete**: Remove selected nodes or edges
- **Ctrl/Cmd + Z**: Undo last action (React Flow built-in)
- **Mouse Wheel**: Zoom in/out
- **Click + Drag**: Pan the canvas

## 🏗️ Architecture

### Project Structure
```
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ChatbotFlowBuilder.tsx   # Main flow builder component
│   ├── Header.tsx               # Application header with save button
│   ├── nodes/
│   │   └── TextNode.tsx         # Text message node component
│   ├── panels/
│   │   ├── NodesPanel.tsx       # Draggable nodes panel
│   │   └── SettingsPanel.tsx    # Node settings editor
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── utils.ts             # Utility functions
└── README.md
```

### Key Components

#### ChatbotFlowBuilder
The main component that orchestrates the entire flow builder:
- Manages nodes and edges state
- Handles drag-and-drop functionality
- Implements connection validation
- Coordinates panel switching

#### TextNode
Reusable node component for text messages:
- Displays message content
- Handles selection states
- Provides source and target handles

#### NodesPanel
Extensible panel for available node types:
- Drag-and-drop interface
- Easy to extend with new node types
- Helpful usage tips

#### SettingsPanel
Context-sensitive settings editor:
- Real-time text editing
- Node information display
- Clean, intuitive interface

## 🔧 Extending the Application

### Adding New Node Types

1. **Create Node Component**:
```typescript
// components/nodes/NewNodeType.tsx
export function NewNodeType({ data, selected }: NodeProps<NewNodeData>) {
  // Implementation
}
```

2. **Register Node Type**:
```typescript
// components/ChatbotFlowBuilder.tsx
const nodeTypes = {
  textNode: TextNode,
  newNodeType: NewNodeType, // Add here
};
```

3. **Add to Nodes Panel**:
```typescript
// components/panels/NodesPanel.tsx
const nodeTypes = [
  // ... existing nodes
  {
    id: 'newNodeType',
    label: 'New Node',
    icon: YourIcon,
    description: 'Description of new node',
    color: 'bg-purple-100 text-purple-600',
  },
];
```

### Customizing Styles
The application uses Tailwind CSS with a custom design system. Key customization points:
- Color scheme in `app/globals.css`
- Component styles in individual component files
- shadcn/ui theme configuration in `components.json`

## 🧪 Testing

The application includes comprehensive error handling and validation:
- Connection validation prevents invalid flows
- Drag-and-drop error handling
- Save validation with user feedback
- TypeScript ensures type safety

## 🚀 Deployment

The application is configured for static export and can be deployed to any static hosting service:

```bash
npm run build
```

The built files will be in the `out` directory, ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent flow builder library
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the icon library

---

**Built with ❤️ for the BiteSpeed Frontend Task**
