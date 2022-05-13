interface IGeneralMenu {
    link: LinkEnum | string,
    title: string,
}

export enum LinkEnum {
    NOT_FOUND = '/404',
    AUTH = '/login',
    HOME = '/home',
    NEWS = '/news',
}



export const GENERAL_MENU: IGeneralMenu[] = [
    {
        link: LinkEnum.HOME,
        title: "Home"
    },
    {
        link: LinkEnum.AUTH,
        title: "Login"
    },
    {
        link: LinkEnum.NEWS,
        title: "News"
    }
]
