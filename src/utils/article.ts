import type {CatelogueType } from '@/types'

const isHeadingEle = (tagName: string) => {
  const reg = /^h[1-6]$/i
  return reg.test(tagName)
}

const generateCatelogue= (nodes:Element[],catelogue:CatelogueType[]) => {
  let index=0
  for (let i = 0; i < nodes.length; i++){
    const tag = nodes[i].tagName
    if (isHeadingEle(tag)) {
      const title = nodes[i].textContent as string
      let children=catelogue,lastCatelogue = catelogue.at(-1)
      while (lastCatelogue&&lastCatelogue.tag<tag) {
        children = children.at(-1)?.children as CatelogueType[]
        lastCatelogue=children.at(-1) 
      }
      children.push({tag,title,index,children:[]})
      index+=1
    }
  }
}

const getElementOffsetTop = (element:HTMLElement) => {
  let offsetTop = 0
  while (element) {
    offsetTop+=element.offsetTop
    element=element.offsetParent as HTMLElement
  }
  return offsetTop
}

export {generateCatelogue,getElementOffsetTop,isHeadingEle}