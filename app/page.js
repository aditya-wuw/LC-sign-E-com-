import Main from "@/Components/Main";
import ProtectedRoute from "@/Context/ProtectedRoute";

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    </>
  );
}
