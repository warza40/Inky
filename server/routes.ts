import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // 1. Top Left - Tall
    const p1 = await storage.createProject({
      title: "Build Review",
      subtitle: "Internal Tools",
      category: "Development",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
      type: "standard",
      size: "tall",
      link: "#",
      content: "A comprehensive tool for reviewing build artifacts."
    });

    // 2. Top Middle - Wide
    const p2 = await storage.createProject({
      title: "Shared Assets",
      subtitle: "12 files",
      category: "Design System",
      type: "folder",
      size: "wide",
      link: "#",
      content: "Central repository for design tokens and assets."
    });
    await storage.createFolderItem({ projectId: p2.id, title: "Logo Pack", date: "Oct 20", type: "file" });
    await storage.createFolderItem({ projectId: p2.id, title: "Brand Guidelines", date: "Oct 22", type: "doc" });
    await storage.createFolderItem({ projectId: p2.id, title: "Icon Set", date: "Oct 25", type: "file" });

    // 3. Right Giant - Large
    const p3 = await storage.createProject({
      title: "Q4 Marketing",
      subtitle: "Global Reach",
      category: "Marketing",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
      type: "standard",
      size: "large",
      link: "#",
      content: "The Q4 marketing push focused on user retention."
    });

    // 4. Bottom Left - Small
    const p4 = await storage.createProject({
      title: "Personal",
      subtitle: "456 items",
      category: "Archives",
      type: "folder",
      size: "small",
      link: "#",
      content: "Personal notes and scratchpad."
    });
    await storage.createFolderItem({ projectId: p4.id, title: "Journal 2023", date: "Jan 01", type: "doc" });
    await storage.createFolderItem({ projectId: p4.id, title: "Recipes", date: "Feb 14", type: "doc" });

    // 5. Center Bottom Left - Square
    const p5 = await storage.createProject({
      title: "Work",
      subtitle: "1 active",
      category: "Projects",
      type: "folder",
      size: "square",
      link: "#",
      content: "Active work projects and tickets."
    });
    await storage.createFolderItem({ projectId: p5.id, title: "Q1 Roadmap", date: "Mar 01", type: "doc" });

    // 6. Bottom Right - Wide
    const p6 = await storage.createProject({
      title: "Back Routine",
      subtitle: "Daily Habits",
      category: "Lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600",
      type: "standard",
      size: "wide_bottom",
      link: "#",
      content: "Stretching routine for better posture."
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await seedDatabase();

  app.get(api.projects.list.path, async (req, res) => {
    const items = await storage.getProjects();
    res.json(items);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const item = await storage.getProject(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(item);
  });

  return httpServer;
}
