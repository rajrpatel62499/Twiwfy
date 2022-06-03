
  
export  interface Theme {
    _id: string;
    name: string;
    children: Child2[];
  }
  
export interface Child2 {
    _id: string;
    name: string;
    children: Child[];
    parentId: string;
    isParent: boolean;
  }
  
export interface Child {
    _id: string;
    name: string;
    parentId: string;
    isParent: boolean;
}



export interface CategoryData {
  categoryData: {
    isActive: boolean;
    isDeleted: boolean;
    isParent: boolean;
    parentId: string;
    _id: string;
    name: string;
    addedBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  currentCategory: {
    sActive: boolean;
    isDeleted: boolean;
    isParent: boolean;
    _id: string;
    name: string;
    addedBy: string;
    parentId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

}
