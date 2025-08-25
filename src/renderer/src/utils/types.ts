export interface ICompany {
  _id?: number
  name: string
  shortname: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  products: IProduct[] | []
}

export interface IGroup {
  _id?: number
  name: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  products: IProduct[] | []
}

interface IProduct {
  name: string
  description?: string
  purchaseRate: number
  saleRate: number
  mrp: number
  spRate?: number
  company: ICompany | null
  group: IGroup | null
  imagePath?: string
  createdAt: Date
  updatedAt: Date
}
