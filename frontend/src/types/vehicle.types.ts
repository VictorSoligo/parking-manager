export interface Vehicle {
  id: number
  vehicleType: string
  plate: string
  ownerName: string
  ownerCpf: string
  entryTime: string
  hourlyRate: number
  totalDue: number
}

export type VehicleList = Vehicle[]
