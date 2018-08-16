
export interface ChooseTopicData{
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

export interface commentData{
  auteur: string,
  message: string,
  conversation: string,
  datePost: string
}