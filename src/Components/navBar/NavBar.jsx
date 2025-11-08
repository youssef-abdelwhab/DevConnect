
import NavBarGuest from "./NavBarGuest";
import NavBarLogge from "./NavBarLogge";
import { useSelector } from "react-redux";

export default function NavBar({mode ,setMode}) {
  const {token} = useSelector((state)=> state.auth)

  return (
    <>
        {token ? <NavBarLogge mode={mode} setMode={setMode}/> : <NavBarGuest mode={mode} setMode={setMode}/>}
    </>
  );
}