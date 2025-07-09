'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TextNode } from './nodes/TextNode';
import { NodesPanel } from './panels/NodesPanel';
import { SettingsPanel } from './panels/SettingsPanel';
import { Header } from './Header';
import { toast } from 'sonner';

// Define node types for extensibility
const nodeTypes = {
  textNode: TextNode,
};

// Initial nodes for demonstration
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'textNode',
    position: { x: 250, y: 250 },
    data: { text: 'Hello! Welcome to our chatbot.' },
  },
];

const initialEdges: Edge[] = [];

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle pane click to deselect nodes
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle edge connection with validation
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      // Check if source handle already has an edge (only one edge allowed from source)
      const sourceHasEdge = edges.some(edge => edge.source === params.source);
      
      if (sourceHasEdge) {
        toast.error('Source handle can only have one outgoing connection');
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle drag and drop from nodes panel
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        console.error('ReactFlow instance or wrapper not available');
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Calculate position manually if project function is not available
      // Manually calculate position using viewport transform
      const viewport = reactFlowInstance?.toObject().viewport;
      const x = event.clientX - reactFlowBounds.left;
      const y = event.clientY - reactFlowBounds.top;
      const position = viewport
        ? {
            x: (x - viewport.x) / viewport.zoom,
            y: (y - viewport.y) / viewport.zoom,
          }
        : { x, y };

      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: { text: 'New message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, reactFlowWrapper]
  );

  // Update selected node data
  const updateNodeData = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
    
    // Update selected node state
    setSelectedNode((selected) =>
      selected?.id === nodeId ? { ...selected, data: { ...selected.data, ...data } } : selected
    );
  }, [setNodes]);

  // Validate and save flow
  const saveFlow = useCallback(() => {
    if (nodes.length <= 1) {
      toast.success('Flow saved successfully!');
      return;
    }

    // Check for nodes with empty target handles (not connected as targets)
    const nodesWithEmptyTargets = nodes.filter(node => {
      const hasIncomingEdge = edges.some(edge => edge.target === node.id);
      return !hasIncomingEdge;
    });

    if (nodesWithEmptyTargets.length > 1) {
      toast.error('Cannot save flow: More than one node has empty target handles');
      return;
    }

    toast.success('Flow saved successfully!');
  }, [nodes, edges]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header onSave={saveFlow} />
        
        <div className="flex-1 relative">
          <div ref={reactFlowWrapper} className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              fitView
              snapToGrid
              snapGrid={[20, 20]}
              defaultEdgeOptions={{
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#3b82f6', strokeWidth: 2 },
              }}
            >
              <Controls />
              <Background color="#f1f5f9" gap={20} />
            </ReactFlow>
          </div>
        </div>
      </div>

      {/* Right sidebar - conditionally show nodes panel or settings panel */}
      <div className="w-80 border-l border-gray-200 bg-white">
        {selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onUpdateNode={updateNodeData}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
}

export default function ChatbotFlowBuilder() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}