import React, {
  useState,
  useEffect,
  MouseEventHandler,
} from 'react'
import './index.less'
import { getWebpUrl } from '../../utils'
export interface propsConfig {
  url?: string | undefined
  children?: any
  className: string
  /** true: 渲染img
   * false: 渲染div背景
   */
  isRenderImg?: boolean
  style?: any
  onclick?: MouseEventHandler<HTMLDivElement> | undefined
}

const WebpContent = function (props: propsConfig) {
  const { url, children, isRenderImg = false, onclick, style } = props
  const [webpUrl, setWebpUrl] = useState()

  useEffect(() => {
      setWebpUrl(() => getWebpUrl(url))
  }, [url])

  const styInfo = (webp: string|undefined, sty:object) => {
    let result = {}
    if( getWebpUrl(webp)){
      result['backgroundImage']=`url(${ getWebpUrl(webp)})`
    }
    if(sty){
      result = {...result, ...sty}
    }
    return result
  }
  
  return (
      <>
        {isRenderImg ? (
          <img src={webpUrl} alt="" onClick={onclick} className={props.className} />
        ) : (
          <div
            className={props.className}
            style={styInfo(url, style)}
            onClick={onclick}
          >
              {children}
          </div>
        )}
      </>
  )
}

export default WebpContent
