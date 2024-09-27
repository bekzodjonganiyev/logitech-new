export type User = {
    id: number
    user: {
      id: number
      phone: string
    }
    first_name: string
    last_name: string
    address: string
    created_at: string
    updated_at: string
    avatar: any
    district: number
    region: number
    recent: Array<number>
  }