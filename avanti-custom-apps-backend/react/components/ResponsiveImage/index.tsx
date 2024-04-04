import React from 'react'
import { ImageTypes } from 'vtex.store-image'
import { defineMessages } from 'react-intl'

import { ResponsiveImageSchema } from '../../typings/responsive-image'
import useIsDesktop from '../../hooks/useIsDesktop'
import ImageCustom from '../StoreImage/Image'

type Props = ResponsiveImageSchema

type VtexImageProps = ImageTypes.ImageProps

const ResponsiveImage: StorefrontFC<Props> = props => {
  const {
    desktopData,
    ...imageProps
  } = props

  if(!desktopData) return <ImageCustom {...imageProps} />

  const {
    active,
    desktopSrc,
    desktopWidth,
    desktopHeight,
  } = desktopData;

  const isDesktop = useIsDesktop()

  const commonProps: VtexImageProps = {
    ...imageProps
  }

  if (active && isDesktop) {
    const desktopProps: VtexImageProps = {
      src: desktopSrc,
      width: desktopWidth,
      height: desktopHeight,
    }  
    return <ImageCustom {...commonProps} {...desktopProps} />
  }  
  return <ImageCustom {...commonProps} />
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.store-image.title',
  },
})

ResponsiveImage.schema = {
  title: messages.title.id,
}

export default ResponsiveImage
