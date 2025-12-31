export interface OfficerDetails {
  rank: string;
  name: string;
  shoulderNumber: string;
  team: string;
  department: string;
  hqName: string;
  addressLine1: string;
  city: string;
  postcode: string;
  telephone: string;
  email: string;
}

export interface AnimationState {
  phase: 'intro' | 'interactive';
  progress: number;
}

export type EnquiryType = 'General Enquiry' | 'Request for Further Information' | 'Provide Further Information' | 'Other';

export interface VehicleDetail {
  registration: string;
  make: string;
  model: string;
  colour: string;
  damaged: 'Yes' | 'No';
  damageDescription?: string;
}

export interface InjuredPerson {
  name: string;
  age: string;
  contact: string;
  description: string;
}