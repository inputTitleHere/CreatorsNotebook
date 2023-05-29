import { Chip } from "@mui/material"
import { string } from "prop-types"

ProjectAuthComponent.propTypes={
  authority:string
}
export default function ProjectAuthComponent({authority}){
  if(authority==="CREATOR"){
    return <Chip color="primary" label="CREATOR"></Chip>
  }else if(authority==="ADMIN"){
    return <Chip color="secondary" label="ADMIN"></Chip>
  }else if(authority==="MEMBER"){
    return <Chip color="tertiary" label="MEMBER"></Chip>
  }else if(authority==="VIEWER"){
    return <Chip color="quaternary" label="VIEWER"></Chip>
  }
}