import { CircleCheckBig } from "lucide-react";

function Appreciation() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center h-[70vh] p-8">
      <div>
        <CircleCheckBig color="green" className="w-20 h-20 flex-1/2 mb-4" strokeWidth={3} />
        <div>
          <h1 className="text-2xl font-bold text-green-900 mb-3">
            Kuesioner anda berhasil dikirim
          </h1>
          <p className="text-slate-600">
            Terimakasih telah berpartisipasi dalam Survei Persepsi Antikorupsi
            Pemerintah Kabupaten Mojokerto Tahun 2025 demi terwujudnya pelayanan
            publik Kabupaten Mojokerto yang bersih dan berintegritas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Appreciation;
