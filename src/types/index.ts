// 旅行ログの型
export interface TravelLogItem {
  title: string;
  url: string;
  label?: string;
  iconName: string;
  color: string;
  date?: string;
}

// 日本地図のピン型
export interface MapPin {
  lon: number;
  lat: number;
  area: string;
  url: string;
  image: string;
  date: string;
}

// 本の型
export interface BookItem {
  name: string;
  eyecatch: string;
  created_at: string;
  noteUrl: string;
}