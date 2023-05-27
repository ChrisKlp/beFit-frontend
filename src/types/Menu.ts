export type TMenuRes = {
  _id: string;
  breakfast: string | null;
  secondBreakfast: string | null;
  dinner: string | null;
  supper: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TMenuReq = {
  id: string;
  breakfast?: string;
  secondBreakfast?: string;
  dinner?: string;
  supper?: string;
};
