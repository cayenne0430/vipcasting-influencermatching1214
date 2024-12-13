export interface Company {
  id: string;
  name: string;
  clientName: string;
  email: string;
  type: 'company';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  plan: 'basic' | 'premium' | 'enterprise';
}

export interface CompanyLoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}