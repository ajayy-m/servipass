import { 
  users,
  services,
  serviceCategories,
  subscriptionPlans,
  contactMessages
} from "../shared/schema.js";

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.serviceCategories = new Map();
    this.services = new Map();
    this.subscriptionPlans = new Map();
    this.contactMessages = new Map();
    
    this.userId = 1;
    this.serviceCategoryId = 1;
    this.serviceId = 1;
    this.subscriptionPlanId = 1;
    this.contactMessageId = 1;
    
    // Seed data
    this.seedData();
  }
  
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser) {
    const id = this.userId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Service category operations
  async getServiceCategories() {
    return Array.from(this.serviceCategories.values());
  }
  
  async getServiceCategory(id) {
    return this.serviceCategories.get(id);
  }
  
  async createServiceCategory(category) {
    const id = this.serviceCategoryId++;
    const serviceCategory = { ...category, id };
    this.serviceCategories.set(id, serviceCategory);
    return serviceCategory;
  }
  
  // Service operations
  async getServices() {
    return Array.from(this.services.values());
  }
  
  async getService(id) {
    return this.services.get(id);
  }
  
  async getServicesByCategory(categoryId) {
    return Array.from(this.services.values()).filter(
      (service) => service.categoryId === categoryId
    );
  }
  
  async getFeaturedServices() {
    return Array.from(this.services.values()).filter(
      (service) => service.featured
    );
  }
  
  async createService(service) {
    const id = this.serviceId++;
    const newService = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }
  
  // Subscription plan operations
  async getSubscriptionPlans() {
    return Array.from(this.subscriptionPlans.values());
  }
  
  async getSubscriptionPlan(id) {
    return this.subscriptionPlans.get(id);
  }
  
  async createSubscriptionPlan(plan) {
    const id = this.subscriptionPlanId++;
    const subscriptionPlan = { ...plan, id };
    this.subscriptionPlans.set(id, subscriptionPlan);
    return subscriptionPlan;
  }
  
  // Contact message operations
  async createContactMessage(message) {
    const id = this.contactMessageId++;
    const contactMessage = { 
      ...message, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages() {
    return Array.from(this.contactMessages.values());
  }
  
  // Seed initial data
  seedData() {
    // Seed service categories
    const cleaningCategory = this.createServiceCategory({
      name: "Cleaning Services",
      description: "Professional cleaning for your home or business",
      icon: "fa-broom"
    });
    
    const maintenanceCategory = this.createServiceCategory({
      name: "Maintenance Services",
      description: "Regular maintenance to keep your property in top condition",
      icon: "fa-tools"
    });
    
    const repairCategory = this.createServiceCategory({
      name: "Repair Services",
      description: "Expert repair services for your home and appliances",
      icon: "fa-hammer"
    });
    
    // Seed services
    this.createService({
      categoryId: 1,
      name: "Home Cleaning",
      description: "Professional cleaning services for your entire home, including dusting, vacuuming, and sanitizing.",
      price: 9900,
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: true,
      tag: "Popular"
    });
    
    this.createService({
      categoryId: 2,
      name: "Lawn Care",
      description: "Regular lawn maintenance including mowing, edging, fertilizing, and seasonal clean-up.",
      price: 12900,
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: true,
      tag: "Seasonal"
    });
    
    this.createService({
      categoryId: 3,
      name: "Appliance Repair",
      description: "Expert repair services for all major home appliances with priority scheduling for subscribers.",
      price: 14900,
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: true,
      tag: "On-Demand"
    });
    
    this.createService({
      categoryId: 1,
      name: "Deep Cleaning",
      description: "Thorough cleaning of your entire home, including hard-to-reach areas and detailed attention.",
      price: 19900,
      imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: "Thorough"
    });
    
    this.createService({
      categoryId: 1,
      name: "Carpet Cleaning",
      description: "Professional carpet cleaning to remove stains, dirt, and allergens.",
      price: 12900,
      imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: null
    });
    
    this.createService({
      categoryId: 2,
      name: "HVAC Maintenance",
      description: "Regular maintenance to keep your heating and cooling systems running efficiently.",
      price: 14900,
      imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: "Essential"
    });
    
    this.createService({
      categoryId: 2,
      name: "Plumbing Maintenance",
      description: "Preventative maintenance to avoid costly plumbing emergencies.",
      price: 13900,
      imageUrl: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: null
    });
    
    this.createService({
      categoryId: 3,
      name: "Electrical Repairs",
      description: "Professional solutions for your electrical issues, from minor fixes to major repairs.",
      price: 15900,
      imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: false,
      tag: "Emergency"
    });
    
    // Seed subscription plans
    this.createSubscriptionPlan({
      name: "Basic Plan",
      description: "Perfect for small homes and apartments",
      price: 9900,
      isPopular: false,
      features: [
        "Monthly cleaning service (3 hours)",
        "Quarterly HVAC filter replacement",
        "Annual home maintenance inspection",
        "Priority scheduling for additional services"
      ]
    });
    
    this.createSubscriptionPlan({
      name: "Plus Plan",
      description: "Ideal for medium-sized homes",
      price: 19900,
      isPopular: true,
      features: [
        "Bi-weekly cleaning service (4 hours)",
        "Quarterly HVAC filter replacement",
        "Semi-annual home maintenance",
        "Basic appliance maintenance",
        "Monthly lawn mowing (Apr-Oct)"
      ]
    });
    
    this.createSubscriptionPlan({
      name: "Premium Plan",
      description: "Complete care for larger homes",
      price: 34900,
      isPopular: false,
      features: [
        "Weekly cleaning service (5 hours)",
        "Quarterly HVAC service & filter replacement",
        "Quarterly home maintenance",
        "Complete appliance maintenance",
        "Weekly lawn care & gardening",
        "Unlimited service calls"
      ]
    });
  }
}

export const storage = new MemStorage();