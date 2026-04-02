import { ProductMediaState } from '../types';

export interface ProductMediaProps {
  value: ProductMediaState;
  onChange: (next: ProductMediaState) => void;
  isUploading: boolean;
  onUploadStateChange: (status: boolean) => void;
}