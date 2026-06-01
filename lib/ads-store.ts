import fs from "fs";
import path from "path";

export interface CarAd {
  id: string;
  title: string;
  titleSr: string;
  url: string;
  price?: string;
  year?: number;
  brand?: string;
  imageUrl?: string;
  featured?: boolean;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "ads.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const defaults: CarAd[] = [
      {
        id: "1",
        title: "2023 BMW 3 Series 330i",
        titleSr: "2023 BMW Serija 3 330i",
        url: "https://www.example.com/ad/bmw-330i",
        price: "€45,900",
        year: 2023,
        brand: "BMW",
        imageUrl: "",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "2022 BMW X5 xDrive40i",
        titleSr: "2022 BMW X5 xDrive40i",
        url: "https://www.example.com/ad/bmw-x5",
        price: "€72,000",
        year: 2022,
        brand: "BMW",
        imageUrl: "",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "2021 BMW M4 Competition",
        titleSr: "2021 BMW M4 Kompetišn",
        url: "https://www.example.com/ad/bmw-m4",
        price: "€89,500",
        year: 2021,
        brand: "BMW",
        imageUrl: "",
        featured: true,
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaults, null, 2));
  }
}

export function getAds(): CarAd[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as CarAd[];
}

export function saveAds(ads: CarAd[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(ads, null, 2));
}

export function addAd(ad: Omit<CarAd, "id" | "createdAt">): CarAd {
  const ads = getAds();
  const newAd: CarAd = {
    ...ad,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  ads.unshift(newAd);
  saveAds(ads);
  return newAd;
}

export function deleteAd(id: string): boolean {
  const ads = getAds();
  const filtered = ads.filter((a) => a.id !== id);
  if (filtered.length === ads.length) return false;
  saveAds(filtered);
  return true;
}

export function updateAd(id: string, updates: Partial<CarAd>): CarAd | null {
  const ads = getAds();
  const idx = ads.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  ads[idx] = { ...ads[idx], ...updates, id };
  saveAds(ads);
  return ads[idx];
}
