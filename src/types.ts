export type FacilityCategory = 'sanitation' | 'drinking_water' | 'classrooms' | 'labs' | 'playground' | 'library' | 'safety';

export interface StudentQuote {
  author: string;
  grade: string; // e.g. "Class XI-A"
  text: string;
}

export interface FacilityReport {
  id: string;
  name: string;
  category: FacilityCategory;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'D+' | 'D-';
  status: 'critical' | 'poor' | 'fair' | 'good';
  lastInspected: string;
  summary: string;
  detailedFindings: string[];
  impactOnStudents: string;
  studentQuotes: StudentQuote[];
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  category: FacilityCategory;
  date: string;
  reporterType: 'Student' | 'Parent' | 'Alumni' | 'Staff';
  upvotes: number;
  isVerified: boolean;
  status: 'unresolved' | 'under_review' | 'temporary_patch' | 'resolved';
  responseFromAuthorities?: string | null;
}
