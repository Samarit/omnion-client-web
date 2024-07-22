export interface ApiResponse {
  status: number
  message: string
}

export interface AuthResponse extends ApiResponse {
  token: string
}
