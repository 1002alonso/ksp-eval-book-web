export interface ResponseDefaultError{
    error: string;
    message:string;
    code:string;
    details:string;
    location:string;
    moreInfo:string;
    type:string;
    active? : boolean;
}