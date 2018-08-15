
export interface ChoosePlanData{
  titre: string,
  categorie: string,
  status: string,
  question: string,
  datePost: string,
  dateEdit: string,
  auteur: string,
  commentaires: Array<any>,
  ConversationUsers: Array<any>
}
export interface EventInformationData{
    description: string,
    title: string,
    place: string,
    startsAt: string,
    endsAt: string,
    idCat: number,
}

export interface ChallengeData{
    description: string
}
export interface PaymentData{
    numberCard: number,
    monthExpire: number,
    yearExpire: number,
    cvv: number,
    price: number,
}
export interface commentData{
  auteur: string,
  message: string,
  conversation: string,
  datePost: string
}