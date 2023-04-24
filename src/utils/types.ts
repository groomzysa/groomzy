export interface ISelectOption<T> {
  label: string;
  value: T;
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export interface IInput<T> {
  value: T;
  error?: string;
}
