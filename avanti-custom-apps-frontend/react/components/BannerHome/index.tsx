import './slick.global.css'
import './slick-theme.global.css'
import React, { useRef } from 'react'
import Slider from 'react-slick'
import { useRuntime, Helmet } from 'vtex.render-runtime'
import styles from './styles.css'
import { formatIOMessage } from 'vtex.native-types'
import { useIntl } from 'react-intl'
import { usePixel } from 'vtex.pixel-manager'
import { useOnView } from 'vtex.on-view'
interface IProps {
  banners: Banner[]
}

type Banner = {
  image: string
  linkImage?: string
  imageAlt?: string
  imageMob: string
  isLcp?: boolean
  hasStartDate?: boolean
  startDate?: string
  hasEndDate?: boolean
  endDate?: string
  analyticsProperties?: 'none' | 'provide'
  promotionId?: string
  promotionName?: string
  promotionPosition?: string
  promotionProductId?: string
  promotionProductName?: string
  __isDuplicated?: boolean
}

function isValidDate(date: string) {
  const maybeDate = Date.parse(date);
  return !isNaN(maybeDate)
}

function compareDates(date1: Date, date2: Date) {
  return date1.getTime() - date2.getTime()
}

const BannerElement = (props: Banner) => {
  const { push } = usePixel()
  const intl = useIntl()
  const { deviceInfo } = useRuntime()
  const phone = deviceInfo.type == 'phone'
  const formattedSrc = formatIOMessage({ id: phone ? props.imageMob : props.image, intl })
  const urlFail: string =
    'https://drogaleste.vtexassets.com/arquivos/banner-main-01-desktop.png'

  const promotionEventData =
    props.analyticsProperties === 'provide'
      ? {
        id: props.promotionId,
        name: props.promotionName,
        creative: formattedSrc,
        position: props.promotionPosition,
        products: [
          {
            productId: props.promotionProductId,
            productName: props.promotionProductName,
          },
        ],
      }
      : undefined

  const imageRef = useRef<HTMLImageElement | null>(null)

  useOnView({
    ref: imageRef,
    onView: () => {
      const slide = imageRef?.current?.closest(".slick-slide");
      const isCloned = slide?.classList.contains(".slick-cloned");

      if (props.analyticsProperties === 'none' || props.__isDuplicated || isCloned) return

      push({
        event: 'promoView',
        promotions: [promotionEventData],
      })
    },
    once: true,
  })

  return (
    <>
      <a
        href={props.linkImage}
        className={styles.sliderRef}
        onClick={() => {
          if (props.analyticsProperties === 'none') return

          push({ event: 'promotionClick', promotions: [promotionEventData] })
        }}
      >
        <img
          className="img-slick-slider"
          src={phone ? props.imageMob : props.image}
          alt={props.imageAlt}
          loading={props.isLcp ? 'eager' : 'lazy'}
          decoding={props.isLcp ? 'sync' : 'async'}
          onError={e => {
            e.currentTarget.src = urlFail
          }}
          width={deviceInfo.isMobile ? 384 : 1270}
          height={deviceInfo.isMobile ? 250 : 300}
          ref={imageRef}
        />
      </a>
    </>
  )
}

const BannerHome = ({ banners }: IProps) => {
  const sliderRef = useRef(null)

  const handleBeforeChange = () => {
    const slider = sliderRef.current as any
    slider?.slick.unslick();
  }

  const { deviceInfo } = useRuntime()
  const phone = deviceInfo.type == 'phone'

  const desktopConfigs = {
    slidesToShow: 2.5,
    slidesToScroll: 1,
    infinite: true,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true,
    arrows: true
  }
  const mobileConfigs = {
    centerMode: false,
    slidesToShow: 1.04,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    cssEase: 'linear',
    arrows: false,
    variableWidth: false,
    variableHeight: false
  }


  return (
    <div className={styles.BannerMainContainer}>
      <Helmet>
        {
          banners?.map((banner, index) => {
            if (banner.isLcp || index == 0) return <link rel="preload" as="image" href={phone ? banner.imageMob : banner.image} key={banner.linkImage} />
            return null
          })
        }
      </Helmet>
      <Slider
        beforeChange={handleBeforeChange}
        className={styles.slider}
        dotsClass={styles.dot}
        {...(deviceInfo.isMobile ? mobileConfigs : desktopConfigs)}
        lazyLoad='ondemand'

      >
        {banners?.filter(banner => {
          if (banner.startDate && banner.hasStartDate && isValidDate(banner.startDate) && compareDates(new Date(banner.startDate), new Date()) > 0) return false
          if (banner.endDate && banner.hasEndDate && isValidDate(banner.endDate) && compareDates(new Date(banner.endDate), new Date()) < 0) return false
          return true
        })
          ?.map((banner, index): JSX.Element => (
            <BannerElement {...banner} key={`home-banner-slide-${index}`} />
          ))}
      </Slider>
    </div>
  )
}

BannerHome.schema = {
  title: 'Banners Slider - Principal',
  description: 'Descrição',
  type: 'object',
  properties: {
    banners: {
      title: 'Banners - Home',
      type: 'array',
      items: {
        title: 'Banner',
        properties: {
          image: {
            title: 'Imagem - Desktop',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          imageMob: {
            title: 'Imagem - Mobile',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          linkImage: {
            title: 'Image Link',
            type: 'string',
          },
          imageAlt: {
            title: 'Descrição da Imagem',
            type: 'string',
          },
          isLcp: {
            title: 'Priorizar carregamento',
            type: 'boolean',
            default: false,
          },
          hasStartDate: {
            title: "Definir uma data de início",
            type: 'boolean',
            enum: [false, true],
            enumNames: [
              "Não",
              "Sim"
            ],
            default: false,
            widget: {
              'ui:widget': 'radio'
            },
          },
          startDate: {},
          hasEndDate: {
            title: "Definir uma data de término",
            type: 'boolean',
            enum: [false, true],
            enumNames: [
              "Não",
              "Sim"
            ],
            default: false,
            widget: {
              'ui:widget': 'radio'
            },
          },
          endDate: {},
          "analyticsProperties": {
            "title": "admin/editor.image.analytics.title",
            "description": "admin/editor.image.analytics.description",
            "enum": ["none", "provide"],
            "enumNames": [
              "admin/editor.image.analytics.none",
              "admin/editor.image.analytics.provide"
            ],
            "widget": {
              "ui:widget": "radio"
            },
            "default": "none"
          }
        },
        required: ["hasStartDate", "hasEndDate"],
        dependencies: {
          hasStartDate: {
            oneOf: [
              {
                properties: {
                  hasStartDate: { enum: [true] },
                  startDate: {
                    title: "Data para início da exibição do banner",
                    description: "Dia e hora em que o banner passará a ser exibido no carrossel",
                    default: new Date().toISOString().replace(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):\d{2}\.\d{3}Z/, '$1:00.000Z'),
                    type: 'string',
                    format: 'date-time',
                    widget: {
                      "ui:widget": "datetime"
                    }
                  },
                },
              },
            ]
          },
          hasEndDate: {
            oneOf: [
              {
                properties: {
                  hasEndDate: { enum: [true] },
                  endDate: {
                    title: "Data limite para exibição do banner",
                    description: "Dia e hora em que o banner passará a ser ocultado no carrossel",
                    default: null,
                    type: 'string',
                    format: 'date-time',
                    widget: {
                      "ui:widget": "datetime"
                    }
                  },
                },
              }
            ]
          },
          "analyticsProperties": {
            "oneOf": [
              {
                "properties": {
                  "analyticsProperties": {
                    "enum": ["provide"]
                  },
                  "promotionId": {
                    "title": "admin/editor.image.analytics.promotionId",
                    "type": "string",
                    "default": ""
                  },
                  "promotionName": {
                    "title": "admin/editor.image.analytics.promotionName",
                    "type": "string",
                    "default": ""
                  },
                  "promotionPosition": {
                    "title": "admin/editor.image.analytics.promotionPosition",
                    "type": "string",
                    "default": ""
                  },
                  "promotionProductId": {
                    "title": "admin/editor.image.analytics.promotionProductId",
                    "type": "string",
                    "default": ""
                  },
                  "promotionProductName": {
                    "title": "admin/editor.image.analytics.promotionProductName",
                    "type": "string",
                    "default": ""
                  }
                }
              },
              {
                "properties": {
                  "analyticsProperties": {
                    "enum": ["none"]
                  }
                }
              }
            ]
          }
        },
      },
    },
  }
}


export default BannerHome
