export interface CustomFaqContextProps {
  questions: CustomFaqQuestionsProps[]
  direction: string
  justify: string
  align: string
  closePrev: boolean
  icon: string | null
  iconColor: string
}

export interface CustomFaqContextStateProps {
  props: CustomFaqContextProps
}

interface CustomFaqQuestionsProps {
  __editorItemTitle: string
  response: string
  colorQ: string
  colorR: string
  colorQIcon: boolean
}
