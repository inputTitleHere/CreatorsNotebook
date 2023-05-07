import './Header.scss'
import { useSelector } from 'react-redux';

/**
 * 헤더용 컴포넌트. 
 * 로그인 여부에 따라 경로 표시를 다르게 한다.
 * @returns <Header/>
 */
export default function Header(){
  const user = useSelector((state)=>state.user.value);


  return(
    <div id="header">
      <h1>창작자의 노트북</h1>
      <div className="user-section">

      </div>
    </div>
  )
}