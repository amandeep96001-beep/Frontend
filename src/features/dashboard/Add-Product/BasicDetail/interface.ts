import { BasicDetailFormState } from '../types';

export interface IBasicDetailProps {
	value: BasicDetailFormState;
	onChange: (next: BasicDetailFormState) => void;
	onPublish: () => void;
	onSaveDraft: () => void;
	canPublish: boolean;
	isSubmitting: boolean;
}