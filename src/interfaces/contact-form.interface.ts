export interface IContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface IContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}