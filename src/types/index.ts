export interface Game {
  name: string;
  src: string;
  rtp?: number;
}

export interface RTPStyle {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

export interface WebsiteOption {
  id: string;
  name: string;
  logo: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  startHour: number;
  endHour: number;
}

export interface GeneratorConfig {
  websiteId: string;
  pragmaticCount: number;
  pgSoftCount: number;
  timeSlotId: string;
  backgroundId: string;
  styleId: string;
}

export interface LayoutOption {
  id: string;
  name: string;
  description: string;
}

export interface TextureOption {
  id: string;
  name: string;
  pattern: string;
}

export interface CardStyleOption {
  id: string;
  name: string;
  background: string;
  border: string;
  opacity: number;
  pattern: string;
  blur: string;
  shadow: string;
}
