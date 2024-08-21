export interface ApiResponse<T> {
  success: string
  status: number
  message: string | null
  data: T | null
}
