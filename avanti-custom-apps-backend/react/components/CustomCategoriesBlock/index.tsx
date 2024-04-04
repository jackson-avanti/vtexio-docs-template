import React from "react";
import { Link } from "vtex.render-runtime";
import ImageCustom from "../StoreImage/Image";
import { useCssHandles } from "vtex.css-handles";


type iProps = {
  title: string
  link?: string
  linkText?: string
  categories: Category[]
}

type Category = {
  __editorItemTitle: string
  imageUrl: string
  imageAlt?: string
  url: string
}

const cssHandles = [
  'ccb-cantainer',
  'ccb-header__wrapper',
  'ccb-header__title',
  'ccb-header__link',
  'ccb-list__wrapper',
  'ccb-list__item',
  'ccb-item__title',
  'ccb-item__image'
]

export const CustomCategoriesBlock = ({ title, link, linkText, categories }: iProps) => {
  const { handles: css } = useCssHandles(cssHandles)

  const formatUrl = (url: string) => {
    if (url && url.startsWith('/')) {
      return url
    }

    return `/${url}`
  }

  return (
    <div className={css['ccb-cantainer']}>
      <div className={css['ccb-header__wrapper']}>
        <h2 className={css['ccb-header__title']}>{title}</h2>
        {link && <Link className={css['ccb-header__link']} to={formatUrl(link)}>{linkText}</Link>}
      </div>
      {
        categories && categories.length > 0 &&
        <div className={css['ccb-list__wrapper']}>
          {categories?.map((category: Category, index: number) => <>
            <Link className={css['ccb-list__item']} to={!category.url && formatUrl(category.url)} key={index}>
              <div className={css['ccb-item__image']}>
                <ImageCustom alt={category.imageAlt} src={category.imageUrl} />
              </div>
              <h3 className={css['ccb-item__title']}>{category.__editorItemTitle}</h3>
            </Link>
          </>)}
        </div>
      }
    </div>
  )
}

CustomCategoriesBlock.schema = {
  title: "Bloco de categorias/coleções",
  type: "object",
  properties: {
    title: {
      type: 'string',
      title: "Título do bloco",
    },
    link: {
      title: 'Link botão superior',
      type: 'string',
    },
    linkText: {
      title: 'Text do link',
      type: 'string'
    },
    categories: {
      title: "Categorias/Coleções",
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            type: 'string',
            title: 'Nome da Categoria/Coleção'
          },
          url: {
            type: 'string',
            title: 'URL',
            description: "Link da categoria ou coleção."
          },
          imageUrl: {
            type: 'string',
            title: 'Imagem',
            widget: {
              "ui:widget": "image-uploader"
            }
          },
          imageAlt: {
            type: 'string',
            title: 'Texto alternativo da imagem',
          }
        }
      }
    }
  }
}