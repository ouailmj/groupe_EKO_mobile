
export interface ChoosePlanData{
    planKey: string;
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