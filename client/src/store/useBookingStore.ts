import { create } from 'zustand';

// ১. প্রথমে স্টোরের ডাটাগুলোর টাইপ ডিফাইন করা
interface BookingState {
  origin: string;
  destination: string;
  floor: string;
  hasLift: boolean;
  estimatedCost: number;
  // ফাংশনগুলোর টাইপ
  setBookingDetails: (details: Partial<Omit<BookingState, 'setBookingDetails' | 'calculateCost'>>) => void;
  calculateCost: () => void;
}

// ২. স্টোর তৈরি করা (টাইপসহ)
export const useBookingStore = create<BookingState>((set) => ({
  origin: '',
  destination: '',
  floor: '1',
  hasLift: true,
  estimatedCost: 0,

  // সেট ফাংশন যেখানে state এর টাইপ অটোমেটিকলি চলে আসবে
  setBookingDetails: (details) => 
    set((state) => ({ 
      ...state, 
      ...details 
    })),

  calculateCost: () => 
    set((state) => {
      let basePrice = 2000;
      const floorNum = parseInt(state.floor) || 1;
      
      // সিম্পল লজিক: লিফট থাকলে চার্জ কম, না থাকলে প্রতি তলায় এক্সট্রা চার্জ
      const liftCharge = state.hasLift ? 500 : floorNum * 300;
      
      return { 
        estimatedCost: basePrice + liftCharge 
      };
    }),
}));