export interface IItem {
    id: string,
    int: number,
    float: string | number,
    color: string,
    child: {
       id: string,
       color: string,
    },
 }
 