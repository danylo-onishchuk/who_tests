export interface QuestionType {
  id: number,
  question: string,
  answers: string[][],
  trueAnswers: string[],
  money: string,
  class?: string,
}
