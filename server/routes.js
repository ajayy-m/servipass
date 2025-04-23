import { createServer } from "http";
import { storage } from "./storage.js";
import { 
  insertContactMessageSchema,
  insertUserSchema
} from "../shared/schema.js";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app) {
  // Set up API routes
  const apiRouter = app.use("/api", async (req, res, next) => {
    next();
  });
  
  // Service Categories
  app.get("/api/service-categories", async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });
  
  app.get("/api/service-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getServiceCategory(id);
      
      if (!category) {
        return res.status(404).json({ message: "Service category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service category" });
    }
  });
  
  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : undefined;
      const featured = req.query.featured === "true";
      
      let services;
      
      if (categoryId) {
        services = await storage.getServicesByCategory(categoryId);
      } else if (featured) {
        services = await storage.getFeaturedServices();
      } else {
        services = await storage.getServices();
      }
      
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  
  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  
  // Subscription Plans
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription plans" });
    }
  });
  
  app.get("/api/subscription-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const plan = await storage.getSubscriptionPlan(id);
      
      if (!plan) {
        return res.status(404).json({ message: "Subscription plan not found" });
      }
      
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription plan" });
    }
  });
  
  // Contact Messages
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const contactMessage = await storage.createContactMessage(result.data);
      res.status(201).json(contactMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit contact message" });
    }
  });
  
  // User Registration (basic implementation)
  app.post("/api/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const existingUser = await storage.getUserByUsername(result.data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const user = await storage.createUser(result.data);
      
      // Don't send password back to client
      const { password, ...userData } = user;
      res.status(201).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}