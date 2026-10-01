export type TransactionType = 'Sale' | 'Rent';
export type Category = 'Residential' | 'Commercial' | 'Land';
export type PropertyType = 'House'|'Plot'|'Shop'|'Office'|'Plaza'|'Apartment'|'Flat'|'Warehouse'|'Commercial Plot'|'Commercial Building'|'Agricultural Land'|'Other';
export type PropertyStatus = 'Available'|'Reserved'|'Sold'|'Rented'|'Unavailable';
export type SizeUnit = 'Marla'|'Kanal'|'Square Feet'|'Square Yard';
export type Feature = 'Corner'|'Main Road'|'Main Boulevard'|'Park Facing'|'Parking'|'Furnished'|'Electricity'|'Gas'|'Water'|'Security'|'Possession'|'Registry'|'Approved'|'Rental Income';

export interface Property {
  id: string; title: string; slug: string;
  transactionType: TransactionType; category: Category; propertyType: PropertyType;
  price: number; priceUnit: string; status: PropertyStatus; featured: boolean;
  city: string; area: string; locality: string; address: string; landmark: string;
  latitude: number | null; longitude: number | null; mapUrl: string;
  size: number; sizeUnit: SizeUnit; bedrooms: number; bathrooms: number; floors: number;
  parking: number; facing: string; constructionStatus: string; possession: string;
  features: Feature[]; shortDescription: string; description: string;
  images: string[]; videoUrl: string; virtualTourUrl: string;
  contactName: string; contactPhone: string; contactWhatsApp: string;
  isDemo: boolean; createdAt: string; updatedAt: string; views: number;
}
export type InquiryStatus = 'New'|'Contacted'|'Follow-up'|'Closed';
export interface Inquiry {
  id: string; name: string; phone: string; whatsapp: string; email: string;
  propertyId: string; propertyTitle: string; message: string;
  status: InquiryStatus; read: boolean; createdAt: string;
}
export interface Settings {
  agencyName: string; logo: string; tagline: string; ceo: string; address: string;
  phone: string; mobile: string; whatsapp: string; email: string; officeHours: string;
  facebook: string; instagram: string; youtube: string; tiktok: string;
  mapUrl: string; latitude: number; longitude: number; seoTitle: string; seoDescription: string;
  heroHeading: string; heroDescription: string;
}
/** Prototype only: browser-side credentials are NOT secure authentication. */
export interface Admin { name: string; username: string; password: string; loggedIn: boolean; }
export interface Analytics { propertyViews: Record<string, number>; whatsappClicks: number; callClicks: number; inquiries: number; }
export type Theme = 'light' | 'dark';
export interface BackupFile {
  version: number; exportedAt: string; properties: Property[]; inquiries: Inquiry[];
  favorites: string[]; settings: Settings; analytics: Analytics; admin: Admin; theme: Theme;
}
