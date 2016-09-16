declare module pg {
    module models {

        export interface IFavor {
            _id:any,
            name:string,
            category:string,
            defPrice:number,
            photo:IPhoto
        }

        export interface IMasterFavor {
            favor:any,
            price:number
        }

        export interface IMaster {
            _id:any,
            name:string,
            photo:IPhoto,
            services:IMasterFavor[],
            works:IPhoto[],
            contacts:{
                phone:string,
                facebook:string,
            }
        }

        export interface IContact {
            _id?:any;
            name:string,
            email:string,
            phone:string,
            photo:string,
            address:string,
            isAcademy:boolean
        }

        export interface IDay {
            _id?:any;
            date:any,
            program:string,

        }
        export interface IVideo {
            _id?:any;
            name:string,
            url:string,
            order:number
        }

        export interface IPhoto {
            _id?:any;
            name:string,
            url:string,
            order:number
        }

        export interface ICourse {
            _id?:any;
            name:string,
            description:string,
            price:number,
            order:number,
            videos:IVideo[],
            hearFormsPhotos:IPhoto[],
            historyPhotos:IPhoto[],
            avatar:string,
            author:{
                name:string,
                photoUrl:string
            },
            days:IDay[],
            courseModulesDates:any[],
            isVisible:boolean,
            comments:IComment[]
        }

        export interface IOrder {
            _id?:any;
            name:string,
            phone:string,
            email:string,
            date:string,
            comment:string,
            admin_comment:string,
            event_id:string,
            event_name:string,
            event_dates:string[],
            answered:boolean,
            booked:boolean
        }

        export interface IUser {
            _id?:any;
            email:string,
            name:string,
            password:string,
            roles:UserRole[]
        }

        export interface IModel {
            _id?:any;
            name:string,
            phone:string,
            email:string,
            address:string,
            fasPhotoUrl:string,
            profilePhotoUrl:string,
            backPhotoUrl:string,
            fullSizePhotoUrl:string,
        }

        export interface ISalonClient {
            _id?:any;
            name:string;
            phone:string;
            email:string;
            address:string;
            group:string;
        }

        export interface IComment {
            _id?:any;
            name:string;
            text:string;
            date:any;
            isVisible:boolean;
            isModerated:boolean;
        }

        export interface IAdminComment extends IComment {
            isCourseVisible:boolean,
            courseId:string,
            courseDates:any[],
            courseName:string
        }
    }

    type UserRole =
        'admin'
            | 'academyModerator'
            | 'academyUser'
            | 'salonModerator'
            | 'salonUser';

}



