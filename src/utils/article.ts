import type {CatelogueType } from '@/types'

const generateCatelogue= (nodes:Element[],catelogue:CatelogueType[]) => {
  let index=0
  const reg = /^h[1-6]$/i
  for (let i = 0; i < nodes.length; i++){
    const tag = nodes[i].tagName
    if (reg.test(tag)) {
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

export {generateCatelogue}