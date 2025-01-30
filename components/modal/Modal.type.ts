export type ModalContent =
  | TextModalContent
  | RadioInputModalContent
  | TextInputModalContent;

type TextModalContent = {
  title: string;
  body?: string;
};

type RadioInputModalContent = TextModalContent & {
  input: "radio";
  radioOptions: string[];
};

type TextInputModalContent = TextModalContent & {
  input: "text";
};

export type ModalProps = {
  contents: ModalContent[];
  onConfirm: (formdata?: unknown) => void;
  onCancel: () => void;
  isOpen: boolean;
  confirmText?: string;
  cancelText?: string;
};

export type FormData = Record<string, undefined | string>;
