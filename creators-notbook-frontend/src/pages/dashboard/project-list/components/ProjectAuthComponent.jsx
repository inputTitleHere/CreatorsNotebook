import { string } from "prop-types"

ProjectAuthComponent.propTypes={
  authority:string
}
export default function ProjectAuthComponent({authority}){
  if(authority==="CREATOR"){
    return <div className="authority creator">CREATOR</div>
  }else if(authority==="ADMIN"){
    return <div className="authority admin">ADMIN</div>
  }else if(authority==="MEMBER"){
    return <div className="authority member">MEMBER</div>
  }else if(authority==="VIEWER"){
    return <div className="authority viewer">VIEWER</div>
  }
}