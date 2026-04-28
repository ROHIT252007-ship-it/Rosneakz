import { useAppTheme } from "../../../shared/hooks/theme"

export type brandType={
    id:number,
    name:string,
    image:any
}

export const brandLigth:brandType[]=[
    {
        id:1,
        name:"Nike",
        image:require('../../../assets/image/Nike.png')
    },
      {
        id:2,
        name:"Puma",
        image:require('../../../assets/image/Puma.png')
    },
      {
        id:3,
        name:"Campus",
        image:require('../../../assets/image/campus.png')
    },
      {
        id:4,
        name:"Adidas",
        image:require('../../../assets/image/Adidas.png')
    },
      {
        id:5,
        name:"Asics",
        image:require('../../../assets/image/asics.png')
    },
      {
        id:6,
        name:"New Balance",
        image:require('../../../assets/image/New Balance.png')
    },
      {
        id:7,
        name:"Reebok",
        image:require('../../../assets/image/reebok.png')
    },
]

export const brandDark:brandType[]=[
    {
        id:1,
        name:"Nike",
        image:require('../../../assets/image/nike-dark.png')
    },
      {
        id:2,
        name:"Puma",
        image:require('../../../assets/image/Puma-dark.png')
    },
      {
        id:3,
        name:"Campus",
        image:require('../../../assets/image/campus-dark.png')
    },
      {
        id:4,
        name:"Adidas",
        image:require('../../../assets/image/Adidas-dark.png')
    },
      {
        id:5,
        name:"Asics",
        image:require('../../../assets/image/asics-dark.png')
    },
      {
        id:6,
        name:"New Balance",
        image:require('../../../assets/image/NewBalance-dark.png')
    },
      {
        id:7,
        name:"Reebok",
        image:require('../../../assets/image/Reebok-dark.png')
    },
]