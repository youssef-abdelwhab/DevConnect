import NavBarGuest from "./NavBarGuest";
import NavBarLogge from "./NavBarLogge";
import { useAppSelector } from "../../redux/store";
import { FC, SetStateAction } from "react";

type ThemeMode = "light" | "dark";
interface ThemeModeType {
  mode: ThemeMode;
  setMode: React.Dispatch<SetStateAction<ThemeMode>>;
}

const NavBar: FC<ThemeModeType> = ({ mode, setMode }) => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <>
      {token ? (
        <NavBarLogge mode={mode} setMode={setMode} />
      ) : (
        <NavBarGuest mode={mode} setMode={setMode} />
      )}
    </>
  );
};
export default NavBar;
