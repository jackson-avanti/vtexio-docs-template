import { ImageTypes } from 'vtex.store-image'

type ResponsiveImageSchema = {
  desktopData: DestkopData
} & ImageTypes.ImageSchema

type DestkopData = {
  active?: boolean
  desktopSrc?: string
  desktopWidth?: string
  desktopHeight?: string
}