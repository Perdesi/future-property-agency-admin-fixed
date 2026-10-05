import type { Admin, Analytics, Property, Settings } from '../types';

export const defaultSettings: Settings = {
  agencyName: 'Future Property Agency',
  logo: '/logo.png',
  tagline: 'جائیداد کی خرید و فروخت کا بااعتماد ادارہ',
  ceo: 'C.E.O Sheikh Umer Ayub',
  address: 'FF 09,20, Bajour Tower, Gunjmandi, Rawalpindi',
  phone: '051-5539200', mobile: '0336-5559200', whatsapp: '0336-5559200',
  email: 'FuturePropertyAgency@outlook.com', officeHours: 'Mon–Sat, 10:00 AM – 7:00 PM',
  facebook: '', instagram: '', youtube: '', tiktok: '',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bajour+Tower+Gunjmandi+Rawalpindi',
  latitude: 33.6007, longitude: 73.0679,
  heroHeading: 'Find Your Future Property',
  heroDescription: 'Trusted property buying, selling, renting and investment services in Rawalpindi.',
  seoTitle: 'Future Property Agency | Property in Rawalpindi & Islamabad',
  seoDescription: 'Buy, sell and rent houses, plots, shops and commercial property in Rawalpindi and Islamabad with Future Property Agency.',
};
export const defaultAdmin: Admin = { name: 'Administrator', username: 'admin', password: 'admin123', loggedIn: false };
export const defaultAnalytics: Analytics = { propertyViews: {}, whatsappClicks: 0, callClicks: 0, inquiries: 0 };

const now = new Date().toISOString();
type Seed = Pick<Property,'title'|'transactionType'|'category'|'propertyType'|'price'|'priceUnit'|'city'|'area'|'locality'|'size'|'sizeUnit'> & Partial<Property>;

const seeds: Seed[] = [
  { title: 'Double-Storey House near Satellite Town', transactionType:'Sale', category:'Residential', propertyType:'House', price:28500000, priceUnit:'PKR', city:'Rawalpindi', area:'Satellite Town', locality:'Block D', size:10, sizeUnit:'Marla', bedrooms:5, bathrooms:4, floors:2, parking:2, features:['Corner','Gas','Electricity','Water','Registry'], featured:true },
  { title: 'Shop on Main Bazaar, Gunjmandi', transactionType:'Sale', category:'Commercial', propertyType:'Shop', price:9500000, priceUnit:'PKR', city:'Rawalpindi', area:'Gunjmandi', locality:'Main Road', size:180, sizeUnit:'Square Feet', features:['Main Road','Electricity','Rental Income'] },
  { title: 'Commercial Plot on Main Road', transactionType:'Sale', category:'Commercial', propertyType:'Commercial Plot', price:42000000, priceUnit:'PKR', city:'Rawalpindi', area:'Chaklala', locality:'Main Road', size:1, sizeUnit:'Kanal', features:['Corner','Main Road','Approved','Registry'], featured:true },
  { title: 'Residential Plot in Gulshan Abad', transactionType:'Sale', category:'Residential', propertyType:'Plot', price:6800000, priceUnit:'PKR', city:'Rawalpindi', area:'Gulshan Abad', locality:'Phase 1', size:5, sizeUnit:'Marla', features:['Approved','Registry','Electricity','Possession'] },
  { title: '2-Bed Apartment for Rent', transactionType:'Rent', category:'Residential', propertyType:'Apartment', price:65000, priceUnit:'PKR / month', city:'Islamabad', area:'G-13', locality:'Markaz', size:950, sizeUnit:'Square Feet', bedrooms:2, bathrooms:2, floors:1, parking:1, features:['Parking','Security','Gas','Electricity'] },
  { title: 'Office Space in Commercial Market', transactionType:'Rent', category:'Commercial', propertyType:'Office', price:120000, priceUnit:'PKR / month', city:'Rawalpindi', area:'Commercial Market', locality:'Ground Floor', size:1200, sizeUnit:'Square Feet', bathrooms:2, features:['Main Road','Parking','Security','Electricity'], featured:true },
  { title: 'Commercial Shop in Bajour Tower (Investment Opportunity)', transactionType:'Sale', category:'Commercial', propertyType:'Shop', price:7500000, priceUnit:'PKR', city:'Rawalpindi', area:'Gunjmandi', locality:'Bajour Tower', address:'Bajour Tower, Gunjmandi, Rawalpindi', size:150, sizeUnit:'Square Feet', floors:5, features:['Main Road','Electricity','Rental Income'], shortDescription:'SAMPLE / DEMO listing: multi-floor commercial tower, easy instalments to be discussed with the agency.', featured:true },
  { title: 'Renovated 5-Marla House for Rent', transactionType:'Rent', category:'Residential', propertyType:'House', price:75000, priceUnit:'PKR / month', city:'Rawalpindi', area:'Bahria Town Phase 8', locality:'Sector A', size:5, sizeUnit:'Marla', bedrooms:3, bathrooms:3, floors:2, parking:1, features:['Gas','Electricity','Water','Security'] },
];

export function buildDemoProperties(): Property[] {
  return seeds.map((s, i) => {
    const n = String(i + 1).padStart(3, '0');
    return {
      id: `FP-${n}`, slug: `${s.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}-fp-${n}`,
      status:'Available', featured:false, address:`${s.locality}, ${s.area}, ${s.city}`, landmark:'',
      latitude:null, longitude:null, mapUrl:'', bedrooms:0, bathrooms:0, floors:1, parking:0,
      facing:'', constructionStatus: s.propertyType==='Plot'||s.propertyType==='Commercial Plot' ? 'Vacant' : 'Completed',
      possession:'Immediate', features:[], shortDescription:`SAMPLE / DEMO listing — ${s.propertyType} in ${s.area}, ${s.city}.`,
      description:'SAMPLE / DEMO listing. This is placeholder content, not a real available property. Edit or delete it from the admin dashboard.',
      images:[], videoUrl:'', virtualTourUrl:'', contactName:'Future Property Agency', contactPhone:'', contactWhatsApp:'',
      isDemo:true, createdAt:now, updatedAt:now, views:0, ...s,
    };
  });
}
