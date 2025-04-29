import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const url =
  "https://script.google.com/macros/s/AKfycbyjaKixG_M9tNXGgKIkQZdgpNWErk7IEQPLrRu5X47zql08yVo-5j7BpOKtmm6NEy_Q/exec";

const fetchDataCapaian = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

interface IDataCapaian {
  opd: string;
  respondent: number;
  score: number;
}

function Result() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["capaian"],
    queryFn: fetchDataCapaian,
  });

  const [dataCapaian, setDataCapaian] = useState<IDataCapaian[] | null>(null);

  useEffect(() => {
    const sortedData = data?.sort(
      (a: IDataCapaian, b: IDataCapaian) => b.respondent - a.respondent
    );
    setDataCapaian(sortedData);
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center max-w-3xl mx-auto px-2 py-10 lg:px-10 text-center">
      <h1 className="text-3xl font-bold">Capaian SPAK 2025</h1>
      <p className="text-lg mb-8">Pemerintah Kabupaten Mojokerto</p>
      {isLoading && <p className="text-center">Memuat data ...</p>}
      {error && (
        <p className="text-center">
          Mohon maaf data gagal dimuat. Coba lagi beberapa saat kemudian.
        </p>
      )}
      {dataCapaian && (
        <>
          <input
            type="search"
            className="px-4 py-2 border-1 border-gray-300 rounded-sm w-full mb-5"
            placeholder="Cari Perangkat Daerah/Unit Kerja"
            onKeyDown={(e) => {
              const value = (e.target as HTMLInputElement).value.toLowerCase();
              setDataCapaian(
                data?.filter((row: IDataCapaian) =>
                  row.opd.toLowerCase().includes(value)
                )
              );
            }}
          />
          <Table>
            <TableHeader className="bg-slate-700">
              <TableRow>
                <TableHead className="text-left text-white px-5 py-2 whitespace-normal">
                  PERANGKAT DAERAH/UNIT KERJA
                </TableHead>
                <TableHead className="text-right text-white px-5 py-2 whitespace-normal">
                  Jumlah Responden
                </TableHead>
                <TableHead className="text-right text-white px-5 py-2 whitespace-normal">
                  Nilai IPAK
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataCapaian.map((capaian) => (
                <TableRow
                  key={capaian.opd}
                  className="hover:bg-slate-500 hover:text-white"
                >
                  <TableCell className="text-left whitespace-normal px-5 py-2">
                    {capaian.opd}
                  </TableCell>
                  <TableCell className="text-right px-5 py-2">
                    {capaian.respondent}
                  </TableCell>
                  <TableCell className="text-right font-medium px-5 py-2">
                    {capaian.score.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

export default Result;
