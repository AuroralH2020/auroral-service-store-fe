export interface IResponse<T> {
  success: boolean;
  result: T;
  message?: string;
}
