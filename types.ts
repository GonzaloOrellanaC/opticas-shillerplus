export interface Product {
  id: number;
  name: string;
  category: 'optica' | 'perfumeria';
  price: string;
  image: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NavItem {
  label: string;
  href: string;
}