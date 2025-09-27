import { 
  type User, type InsertUser,
  type Service, type InsertService,
  type Portfolio, type InsertPortfolio,
  type Testimonial, type InsertTestimonial,
  type Team, type InsertTeam,
  type Event, type InsertEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  
  // Portfolio methods
  getAllPortfolio(): Promise<Portfolio[]>;
  getPortfolio(id: string): Promise<Portfolio | undefined>;
  getFeaturedPortfolio(): Promise<Portfolio[]>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: string, portfolio: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
  deletePortfolio(id: string): Promise<boolean>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  
  // Team methods
  getAllTeam(): Promise<Team[]>;
  getTeamMember(id: string): Promise<Team | undefined>;
  getLeadershipTeam(): Promise<Team[]>;
  createTeamMember(team: InsertTeam): Promise<Team>;
  updateTeamMember(id: string, team: Partial<InsertTeam>): Promise<Team | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;
  
  // Event methods
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private portfolio: Map<string, Portfolio>;
  private testimonials: Map<string, Testimonial>;
  private team: Map<string, Team>;
  private events: Map<string, Event>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.portfolio = new Map();
    this.testimonials = new Map();
    this.team = new Map();
    this.events = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample services
    const sampleServices: InsertService[] = [
      {
        title: "Luxury Wedding Experience",
        description: "Transform your special day into an unforgettable luxury experience with our comprehensive wedding planning services.",
        category: "Wedding",
        features: ["Full-service planning", "Venue coordination", "Catering management", "Entertainment booking", "Photography & videography"],
        startingPrice: "15000.00",
        duration: "6-8 hours",
        iconType: "wedding",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-wedding-decorations-with-white-flowers-4078-large.mp4",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
        isPopular: true
      },
      {
        title: "Corporate Events & Galas",
        description: "Elevate your corporate image with sophisticated events that leave lasting impressions on clients and employees.",
        category: "Corporate",
        features: ["Event strategy", "Brand integration", "Speaker management", "Technology setup", "Networking facilitation"],
        startingPrice: "25000.00",
        duration: "4-6 hours",
        iconType: "corporate",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-elegant-corporate-gala-hall-setup-4095-large.mp4",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
        isPopular: true
      },
      {
        title: "Private Luxury Events",
        description: "Exclusive private events tailored to your unique vision, from intimate gatherings to grand celebrations.",
        category: "Private",
        features: ["Custom theme design", "Exclusive venues", "Personal concierge", "VIP services", "Security coordination"],
        startingPrice: "20000.00",
        duration: "Full Day",
        iconType: "private",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-luxury-private-party-venue-4087-large.mp4",
        imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200",
        isPopular: false
      }
    ];

    for (const service of sampleServices) {
      await this.createService(service);
    }

    // Sample portfolio
    const samplePortfolio: InsertPortfolio[] = [
      {
        title: "Tech Innovation Summit 2024",
        description: "A cutting-edge corporate summit featuring holographic displays, immersive technology demos, and futuristic staging for 500+ tech leaders.",
        eventType: "Corporate Summit",
        location: "San Francisco Convention Center",
        date: new Date("2024-05-20"),
        images: [
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
        ],
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tech-conference-presentation-hall-4092-large.mp4",
        clientName: "TechVision Inc.",
        attendeeCount: 520,
        budget: "180000.00",
        tags: ["Corporate", "Technology", "Innovation", "Luxury"],
        isFeatured: true
      },
      {
        title: "Sterling-Chen Wedding Celebration",
        description: "An enchanting luxury wedding with LED installations, floating centerpieces, and cinematic lighting design at Napa Valley's premier venue.",
        eventType: "Luxury Wedding",
        location: "Auberge du Soleil, Napa Valley",
        date: new Date("2024-08-22"),
        images: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
        ],
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-wedding-ceremony-decorations-4078-large.mp4",
        clientName: "Michael & Emma Chen",
        attendeeCount: 120,
        budget: "85000.00",
        tags: ["Wedding", "Luxury", "Napa Valley", "Outdoor"],
        isFeatured: true
      },
      {
        title: "Innovation Labs Product Launch",
        description: "A high-energy product launch featuring dynamic lighting, interactive displays, and immersive brand experiences for a groundbreaking AI platform.",
        eventType: "Product Launch",
        location: "Los Angeles Convention Center",
        date: new Date("2024-09-10"),
        images: [
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800"
        ],
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-product-launch-stage-setup-4094-large.mp4",
        clientName: "Innovation Labs",
        attendeeCount: 350,
        budget: "120000.00",
        tags: ["Product Launch", "Technology", "Interactive", "AI"],
        isFeatured: false
      },
      {
        title: "Midnight Masquerade Gala",
        description: "An exclusive black-tie gala featuring gothic elegance, dramatic lighting, and theatrical performances for high-profile philanthropic fundraising.",
        eventType: "Charity Gala",
        location: "The Plaza Hotel, New York",
        date: new Date("2024-10-31"),
        images: [
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
        ],
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-elegant-ballroom-gala-4089-large.mp4",
        clientName: "Metropolitan Arts Foundation",
        attendeeCount: 200,
        budget: "150000.00",
        tags: ["Gala", "Fundraising", "Black-tie", "Theatrical"],
        isFeatured: true
      }
    ];

    for (const portfolio of samplePortfolio) {
      await this.createPortfolio(portfolio);
    }

    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        clientName: "Sarah Johnson",
        clientTitle: "CEO",
        company: "TechVision Inc.",
        content: "Real Events transformed our annual summit into an absolutely magical experience. Every detail was perfect, and our guests are still talking about it months later.",
        rating: 5,
        eventType: "Corporate Summit",
        date: new Date("2024-06-15"),
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c4f4?w=400",
        location: "San Francisco"
      },
      {
        clientName: "Michael & Emma Chen",
        clientTitle: null,
        company: null,
        content: "Our wedding was beyond our wildest dreams. The team's attention to detail and ability to bring our vision to life was extraordinary.",
        rating: 5,
        eventType: "Luxury Wedding",
        date: new Date("2024-08-22"),
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        location: "Napa Valley"
      },
      {
        clientName: "Robert Martinez",
        clientTitle: "Founder",
        company: "Innovation Labs",
        content: "Professional, creative, and flawless execution. They turned our product launch into an unforgettable experience for all attendees.",
        rating: 5,
        eventType: "Product Launch",
        date: new Date("2024-09-10"),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        location: "Los Angeles"
      }
    ];

    for (const testimonial of sampleTestimonials) {
      await this.createTestimonial(testimonial);
    }

    // Sample team members
    const sampleTeam: InsertTeam[] = [
      {
        name: "Alexandra Sterling",
        role: "Creative Director & Founder",
        bio: "With over 15 years of experience in luxury event planning, Alexandra brings visionary creativity and meticulous attention to detail to every project.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
        specialties: ["Luxury Weddings", "Corporate Galas", "Creative Direction"],
        experience: 15,
        email: "alexandra@realevents.com",
        linkedin: "https://linkedin.com/in/alexandra-sterling",
        isLeadership: true
      },
      {
        name: "Marcus Thompson",
        role: "Operations Director",
        bio: "Marcus ensures seamless execution of every event with his expertise in logistics coordination and vendor management.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        specialties: ["Event Logistics", "Vendor Management", "Timeline Coordination"],
        experience: 12,
        email: "marcus@realevents.com",
        linkedin: "https://linkedin.com/in/marcus-thompson",
        isLeadership: true
      },
      {
        name: "Elena Rodriguez",
        role: "Design Specialist",
        bio: "Elena's artistic vision transforms spaces into breathtaking environments that perfectly capture each client's unique style.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b332c4f4?w=600",
        specialties: ["Floral Design", "Space Transformation", "Theme Development"],
        experience: 8,
        email: "elena@realevents.com",
        linkedin: "https://linkedin.com/in/elena-rodriguez",
        isLeadership: false
      }
    ];

    for (const member of sampleTeam) {
      await this.createTeamMember(member);
    }

    // Sample events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Future of Events Conference 2025",
        description: "Join industry leaders for a day exploring cutting-edge event technology, immersive experiences, and the future of luxury entertainment.",
        date: new Date("2025-02-15"),
        location: "Silicon Valley Event Center",
        eventType: "Conference",
        status: "upcoming",
        ticketPrice: "299.00",
        capacity: 400,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        isPublic: true
      },
      {
        title: "Luxury Wedding Showcase",
        description: "An exclusive showcase of our premium wedding services featuring live demonstrations, vendor partnerships, and immersive experiences.",
        date: new Date("2025-03-20"),
        location: "Beverly Hills Hotel",
        eventType: "Showcase",
        status: "upcoming",
        ticketPrice: "150.00",
        capacity: 200,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        isPublic: true
      },
      {
        title: "Corporate Innovation Summit",
        description: "A premium networking event for C-level executives featuring keynote speakers, technology demos, and exclusive partnership opportunities.",
        date: new Date("2025-04-10"),
        location: "Manhattan Conference Center",
        eventType: "Summit",
        status: "upcoming",
        ticketPrice: "599.00",
        capacity: 150,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
        isPublic: false
      }
    ];

    for (const event of sampleEvents) {
      await this.createEvent(event);
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      startingPrice: insertService.startingPrice ?? null,
      duration: insertService.duration ?? null,
      videoUrl: insertService.videoUrl ?? null,
      imageUrl: insertService.imageUrl ?? null,
      isPopular: insertService.isPopular ?? null
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (!existing) return undefined;
    
    const updated: Service = { ...existing, ...updateData };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  // Portfolio methods
  async getAllPortfolio(): Promise<Portfolio[]> {
    return Array.from(this.portfolio.values());
  }

  async getPortfolio(id: string): Promise<Portfolio | undefined> {
    return this.portfolio.get(id);
  }

  async getFeaturedPortfolio(): Promise<Portfolio[]> {
    return Array.from(this.portfolio.values()).filter(p => p.isFeatured);
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = randomUUID();
    const portfolio: Portfolio = { 
      ...insertPortfolio, 
      id,
      videoUrl: insertPortfolio.videoUrl ?? null,
      clientName: insertPortfolio.clientName ?? null,
      attendeeCount: insertPortfolio.attendeeCount ?? null,
      budget: insertPortfolio.budget ?? null,
      isFeatured: insertPortfolio.isFeatured ?? null
    };
    this.portfolio.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolio(id: string, updateData: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const existing = this.portfolio.get(id);
    if (!existing) return undefined;
    
    const updated: Portfolio = { ...existing, ...updateData };
    this.portfolio.set(id, updated);
    return updated;
  }

  async deletePortfolio(id: string): Promise<boolean> {
    return this.portfolio.delete(id);
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      clientTitle: insertTestimonial.clientTitle ?? null,
      company: insertTestimonial.company ?? null,
      avatar: insertTestimonial.avatar ?? null,
      location: insertTestimonial.location ?? null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: string, updateData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existing = this.testimonials.get(id);
    if (!existing) return undefined;
    
    const updated: Testimonial = { ...existing, ...updateData };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Team methods
  async getAllTeam(): Promise<Team[]> {
    return Array.from(this.team.values());
  }

  async getTeamMember(id: string): Promise<Team | undefined> {
    return this.team.get(id);
  }

  async getLeadershipTeam(): Promise<Team[]> {
    return Array.from(this.team.values()).filter(t => t.isLeadership);
  }

  async createTeamMember(insertTeam: InsertTeam): Promise<Team> {
    const id = randomUUID();
    const team: Team = { 
      ...insertTeam, 
      id,
      image: insertTeam.image ?? null,
      experience: insertTeam.experience ?? null,
      email: insertTeam.email ?? null,
      linkedin: insertTeam.linkedin ?? null,
      isLeadership: insertTeam.isLeadership ?? null
    };
    this.team.set(id, team);
    return team;
  }

  async updateTeamMember(id: string, updateData: Partial<InsertTeam>): Promise<Team | undefined> {
    const existing = this.team.get(id);
    if (!existing) return undefined;
    
    const updated: Team = { ...existing, ...updateData };
    this.team.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.team.delete(id);
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values()).filter(e => 
      e.status === 'upcoming' && new Date(e.date) > now
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent, 
      id,
      ticketPrice: insertEvent.ticketPrice ?? null,
      capacity: insertEvent.capacity ?? null,
      image: insertEvent.image ?? null,
      isPublic: insertEvent.isPublic ?? null
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const existing = this.events.get(id);
    if (!existing) return undefined;
    
    const updated: Event = { ...existing, ...updateData };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }
}

export const storage = new MemStorage();
