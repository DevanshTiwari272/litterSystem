export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Officer';
  status: 'Active' | 'Inactive';
}

export interface Zone {
  id: string;
  name: string;
  cameraCount: number;
}

export interface Camera {
  id: string;
  name: string;
  zoneId: string;
  status: 'Online' | 'Offline' | 'Reconnecting';
  streamUrl: string;
}

export interface Alert {
  id: string;
  cameraId: string;
  zoneId: string;
  timestamp: string;
  objectType: 'Plastic Bottle' | 'Wrapper' | 'Bag' | 'Can' | 'Other';
  confidence: number;
  status: 'Open' | 'Acknowledged' | 'Resolved' | 'False Positive';
  thumbnailUrl: string;
}

export interface Incident extends Alert {
  videoClipUrl?: string;
  actionDetected: string;
  assignedOfficerId?: string;
  assignedNotes?: string;
  modelVersions: string;
}
