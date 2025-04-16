import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { opd_acronym } from "./opd";

function Page404() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10 text-center">
      <h1 className="text-3xl font-bold">404-Halaman tidak ditemukan</h1>
      <p className="text-lg">Halaman yang anda cari tidak ditemukan</p>
      <p className="mb-5">Kuesioner survei yang tersedia:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {opd_acronym.map((opd) => (
          <Link to={opd} key={opd}>
            <Button size="sm" variant="outline">
              {opd}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Page404;
