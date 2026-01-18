"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ImageIcon, Folder, File } from "lucide-react";
import { cn } from "@/lib/utils";

type FolderItem = {
  id: string;
  title: string;
  date: string;
};

type Project = {
  type: 'project' | 'folder';
  size: 'tall' | 'wide' | 'large' | 'small' | 'square' | 'wide_bottom';
  title: string;
  subtitle?: string;
  category?: string;
  imageUrl?: string | null;
  items?: FolderItem[];
};

type GridCardProps = {
  project: Project;
  onClick?: () => void;
  index: number;
};

// Size mapping for CSS Grid matching the provided reference layout
const sizeClasses = {
  tall_narrow: "col-span-1 row-span-2", // Top left
  wide_short: "col-span-2 row-span-1",  // Top middle
  large_complex: "col-span-2 row-span-2", // Right side giant
  medium_regular: "col-span-1 row-span-1", // Bottom left (small)
  square: "col-span-1 row-span-1",        // Bottom middle-left
  wide_bottom: "col-span-2 row-span-1",   // Bottom right
};

export function GridCard({ project, onClick, index }: GridCardProps) {
  const isFolder = project.type === 'folder';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-card border border-border/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer",
        project.size === 'tall' ? sizeClasses.tall_narrow :
        project.size === 'wide' ? sizeClasses.wide_short :
        project.size === 'large' ? sizeClasses.large_complex :
        project.size === 'small' ? sizeClasses.medium_regular :
        project.size === 'square' ? sizeClasses.square :
        project.size === 'wide_bottom' ? sizeClasses.wide_bottom :
        "col-span-1"
      )}
      onClick={onClick}
    >
      {/* Content Container */}
      <div className="flex flex-col h-full">
        
        {/* Header Section */}
        <div className="p-6 pb-2 z-10 relative">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {project.category}
            </span>
            <div className="p-2 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground leading-tight font-display mb-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        {/* Visual Content Area */}
        <div className="flex-1 relative p-6 pt-2 overflow-hidden">
          {isFolder ? (
            <FolderView items={project.items || []} />
          ) : (
            <StandardView imageUrl={project.imageUrl} title={project.title} />
          )}
        </div>

        {/* Action Bar */}
        {!isFolder && (
          <div className="p-6 pt-0 mt-auto">
            <button className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 text-sm transition-all active:scale-[0.98]">
              View Details
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StandardView({ imageUrl, title }: { imageUrl?: string | null; title: string }) {
  return (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-muted">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-secondary">
          <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
        </div>
      )}
    </div>
  );
}

function FolderView({ items }: { items: FolderItem[] }) {
  return (
    <div className="relative h-full flex flex-col gap-3">
      {/* Folder Shape Mask/Outline */}
      <div className="absolute -top-8 left-0 w-24 h-8 bg-card border-t border-l border-r border-border/50 rounded-t-xl z-0" />
      
      {/* Main Container - Outline only */}
      <div className="flex-1 border border-border/50 rounded-2xl rounded-tl-none p-4 flex flex-col gap-3 z-10">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Folder className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Contents</span>
        </div>
        
        {/* List of files as individual small containers */}
        <div className="space-y-3">
          {items.slice(0, 3).map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-primary/5 rounded-lg">
                  <File className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.date}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
