

export const sortOptions = {
  byCreateDate:{
    asc:(left,right)=>Date.parse(left.createDate)-Date.parse(right.createDate),
    desc:(left,right)=>Date.parse(right.createDate)-Date.parse(left.createDate),
  },

}