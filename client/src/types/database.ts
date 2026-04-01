export interface Service {
  id: string;
  name: string;
  base_price: number;
  description: string;
  icon_name: string;
}

export interface Booking {
  id: string;
  created_at: string;
  customer_name?: string;
  phone_number?: string;
  origin: string;
  destination: string;
  floor: string;
  has_lift: boolean;
  estimated_cost: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  service_id?: string;
}