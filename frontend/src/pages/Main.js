import MainSidebar from "./MainSidebar/MainSidebar";
import { NameProvider } from "../context/NameContext";

export default function Main() {
  return (
    <NameProvider>
      <MainSidebar />
    </NameProvider>
  );
}