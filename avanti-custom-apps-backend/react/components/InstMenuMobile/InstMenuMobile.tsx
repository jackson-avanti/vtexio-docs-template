import React, { useState } from "react";
import { ItemInstMenu } from "../InstMenu/types"
import { cssHandles } from "../InstMenuDesktop/handles";
import { useCssHandles, applyModifiers } from "vtex.css-handles";

interface IProps {
  schema: ItemInstMenu[]
}

const InstMenuMobile = ({ schema }: IProps) => {
  const { handles: css } = useCssHandles(cssHandles)

  const MenuIcon = () => (
    <svg className={applyModifiers(css['icon'], ['instmenumobile', 'toggle-state-isopen'])} xmlns="http://www.w3.org/2000/svg" width="11.212" height="6.986" viewBox="0 0 11.212 6.986">
      <path id="arrow" d="M19.914,20.108a1.282,1.282,0,0,1,1-.484,1.378,1.378,0,0,1,1.032.484l4.194,4.162a1.143,1.143,0,0,1,.371.92,1.469,1.469,0,0,1-.4.984,1.424,1.424,0,0,1-1,.387,1.209,1.209,0,0,1-.936-.387l-3.259-3.226-3.259,3.291a1.344,1.344,0,0,1-.984.371,1.241,1.241,0,0,1-.92-.4,1.319,1.319,0,0,1-.452-1,1.132,1.132,0,0,1,.452-.936Zm1,3.678Z" transform="translate(26.512 26.61) rotate(180)" fill="#491835" />
    </svg>
  )

  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  const firstTitle = schema?.find(item => item.type === 'titulo')
  const currentPath = !!document && document?.location?.pathname?.replace('/', '')

  return (
    <div className={applyModifiers(css['container-content'], ['instmenumobile', 'instMenuMobileContainer', `${isOpen ? 'opened' : 'closed'}`, 'mobile'])}>
      <button aria-label="Expandir opções" onClick={handleMenu} className={applyModifiers(css['container-content'], ['title', 'text'])}>Navegue pelo menu<MenuIcon /></button>
      {isOpen ?
        (<div className={applyModifiers(css['list'], ['options', ''])}>
          {schema?.map((item: ItemInstMenu, index: number) => {
            const isCurrentHref = item?.href?.includes(currentPath)

            if (item.type == 'titulo') {
              return (
                <h4 key={index} title={`sessão ${item.text}`} className={applyModifiers(css['list-item'], ['option', 'title', item.text === firstTitle?.text ? 'firstTitle' : ''])} >{item.text}</h4>
              )
            }

            return <a key={index} title={`ir para ${item.text}`} href={item.href} className={applyModifiers(css['list-item'], ['option', 'link', isCurrentHref ? 'active' : 'disabled'])}>{item.text}</a>
          })}
        </div>)
        :
        null
      }
    </div>
  )
}

export default InstMenuMobile
