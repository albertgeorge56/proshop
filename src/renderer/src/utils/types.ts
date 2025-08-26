export interface ICompany {
  _id?: string
  name: string
  shortname: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  products: IProduct[] | []
}

export interface IGroup {
  _id?: string
  name: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  products: IProduct[] | []
}

export interface IProduct {
  _id?: string
  name: string
  description?: string
  purchaseRate: number
  saleRate: number
  mrp: number
  spRate?: number
  company: ICompany
  group: IGroup
  imagePath?: string
  createdAt: Date
  updatedAt: Date
}
