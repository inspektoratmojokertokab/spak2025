import { useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Button } from "./components/ui/button";
import { opd_acronym, opd as opdObject } from "./opd";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const { opd } = useParams();
  const navigate = useNavigate();

  if (!opd_acronym.includes(opd as string)) {
    navigate("/Page404");
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      const formDataObj = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          key,
          value.toString(),
        ])
      );

      await fetch(
        "https://script.google.com/macros/s/AKfycbzAIDNuyW-COVNZDlFdsFT7amFr4-DvT6iuT3xgpzfAWO-Kfh1yq-z6_SB_KxVP7fo6GA/exec",
        {
          method: "POST",
          body: JSON.stringify(formDataObj),
        }
      );
    },
    onSuccess: () => {
      navigate(`/appreciation`);
    },
  });

  return (
    <>
      <div className="my-7 mx-4 md:max-w-3xl md:mx-auto">
        <h1 className="text-xl uppercase font-bold text-center">
          Survei Persepsi Anti Korupsi
        </h1>
        <p className="text-xl text-center uppercase font-semibold mb-4">
          {opdObject[opd as string]}
        </p>
        <p className="text-left mb-2">
          Dalam rangka menilai persepi antikorupsi masyarakat di{" "}
          <span>{opdObject[opd as string]}</span> Kabupaten Mojokerto, kami
          mengharapkan kesediaan Bapak/Ibu/Saudara dapat berperan aktif dalam
          memberikan informasi. Mohon setiap pertanyaan/pernyataan dijawab
          dengan benar dan jujur. Kami menjamin kerahasiaan atas informasi yang
          Bapak/Ibu/Saudara berikan.
        </p>
        <p className="text-left mb-8">
          Atas perhatian dan kerja sama yang baik diucapkan terima kasih.
        </p>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <section className="text-left border rounded-md p-4 my-5 shadow-xl">
            <div className="section-header mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">Identitas Responden</h2>
              <p>
                Identitas anda yang diisikan pada formulir ini akan dijaga
                kerahasiaannya.
              </p>
            </div>
            <div className="section-content">
              <input
                type="hidden"
                name="opd"
                value={opdObject[opd as string]}
              />
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="name">
                  Nama Responden<span className="text-red-500">*</span>
                </Label>
                <Input id="name" type="text" name="nama" required />
              </div>
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="phone">
                  Nomor Telepon/Handphone<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="telepon"
                  type="tel"
                  required
                  pattern="^(\+62|62|0)8[1-9][0-9]{6,9}$"
                  title="Nomor telepon/Handphone harus berupa 10-13 digit dan dimulai dengan 08 atau +628"
                />
              </div>
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="age">
                  Usia Responden<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  name="usia"
                  required
                  pattern="^(1[0-1][0-9]|120|1[89]|[2-9][0-9])$"
                />
              </div>
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="gender">
                  Jenis Kelamin<span className="text-red-500">*</span>
                </Label>
                <RadioGroup id="gender" name="gender" required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Laki-Laki" id="r1" />
                    <Label htmlFor="r1">Laki-Laki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Perempuan" id="r2" />
                    <Label htmlFor="r2">Perempuan</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="education">
                  Pendidikan Terakhir<span className="text-red-500">*</span>
                </Label>
                <RadioGroup id="education" name="pendidikan" required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="<SMA atau Sederajat" id="ed-1" />
                    <Label htmlFor="ed-1">&le;SMA atau Sederajat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D1/D2/D3" id="ed-2" />
                    <Label htmlFor="ed-2">D1/D2/D3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D4/S1" id="ed-3" />
                    <Label htmlFor="ed-3">D4/S1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="S2/S3" id="ed-4" />
                    <Label htmlFor="ed-4">S2/S3</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="work">
                  Pekerjaan Utama<span className="text-red-500">*</span>
                </Label>
                <RadioGroup id="work" name="pekerjaan" required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pelajar/Mahasiswa" id="wr1" />
                    <Label htmlFor="wr1">Pelajar/Mahasiswa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Peneliti/Dosen" id="wr2" />
                    <Label htmlFor="wr2">Peneliti/Dosen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PNS/TNI/Polri" id="wr3" />
                    <Label htmlFor="wr3">PNS/TNI/Polri</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pegawai BUMN/BUMD" id="wr4" />
                    <Label htmlFor="wr4">Pegawai BUMN/BUMD</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pegawai Swasta" id="wr5" />
                    <Label htmlFor="wr5">Pegawai Swasta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Wiraswasta" id="wr6" />
                    <Label htmlFor="wr6">Wiraswasta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lainnya" id="wr7" />
                    <Label htmlFor="wr7">Lainnya</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full  items-center gap-1.5 mb-4">
                <Label htmlFor="workPlace">
                  Institusi/Tempat Kerja{" "}
                  <span className="text-sm text-slate-400 italic">
                    (Opsional)
                  </span>
                </Label>
                <Input id="workPlace" type="text" name="tempatkerja" />
              </div>
            </div>
          </section>
          <section className="text-left border p-4 mb-5 shadow-xl">
            <div className="section-header mb- border-b pb-2">
              <h2 className="text-xl font-semibold">
                Kuesioner Persepsi Antikorupsi
              </h2>
              <p>
                Pada bagian ini kami akan meminta pendapat dan pengalaman
                Bapak/Ibu/Saudara tentang pelayanan pada unit layanan ini.
                Lingkari jawaban sesuai dengan persepsi dan pengetahuan
                Bapak/Ibu/Saudara terhadap hal–hal yang ditanyakan.
              </p>
            </div>
            <div className="section-content">
              <div className="grid w-full items-center gap-1.5 my-8 border-b pb-4">
                <p>
                  Apakah menurut penilaian Bapak/Ibu/Saudara terdapat
                  <strong> diskriminasi </strong> pada unit layanan ini?
                </p>
                <RadioGroup id="q1" name="diskriminasi">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-red-500">
                    <RadioGroupItem value="0" id="q12" className="bg-white" />
                    <Label
                      htmlFor="q12"
                      className="p-1 text-white block w-full"
                    >
                      Setuju, terdapat diskriminasi di unit layanan ini
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500 p-2 rounded-lg">
                    <RadioGroupItem value="1" id="q11" className="bg-white" />
                    <Label htmlFor="q11" className="p-1 text-white w-full">
                      Tidak Setuju, tidak terdapat diskriminasi di unit layanan
                      ini
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full items-center gap-1.5 mb-8 border-b pb-4">
                <p>
                  Apakah menurut penilaian Bapak/Ibu/Saudara terdapat petugas
                  yang memberikan pelayanan diluar prosedur sehingga
                  mengindikasikan <strong> kecurangan </strong>?
                </p>
                <RadioGroup id="q1" name="kecurangan">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-red-500">
                    <RadioGroupItem value="0" id="q22" className="bg-white" />
                    <Label htmlFor="q22" className="p-1 text-white w-full">
                      Setuju, terdapat kecurangan di unit layanan ini
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500 p-2 rounded-lg">
                    <RadioGroupItem value="1" id="q21" className="bg-white" />
                    <Label htmlFor="q21" className="p-1 text-white w-full">
                      Tidak Setuju, tidak terdapat kecurangan di unit layanan
                      ini
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full items-center gap-1.5 mb-8 border-b pb-4">
                <p>
                  Apakah menurut penilaian Bapak/Ibu/Saudara terdapat praktik
                  pemberian imbalan uang/barang <strong> (gratifikasi) </strong>{" "}
                  pada unit layanan ini?
                </p>
                <RadioGroup id="q1" name="gratifikasi">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-red-500">
                    <RadioGroupItem value="0" id="q32" className="bg-white" />
                    <Label htmlFor="q32" className="p-1 text-white w-full">
                      Setuju, terdapat gratifikasi di unit layanan ini
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500 p-2 rounded-lg">
                    <RadioGroupItem value="1" id="q31" className="bg-white" />
                    <Label htmlFor="q31" className="p-1 text-white w-full">
                      Tidak Setuju, tidak terdapat gratifikasi di unit layanan
                      ini
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full items-center gap-1.5 mb-8 border-b pb-4">
                <p>
                  Apakah menurut penilaian Bapak/Ibu/Saudara terdapat praktik
                  pungutan liar <strong> (pungli) </strong> pada unit layanan
                  ini?
                </p>
                <RadioGroup id="q1" name="pungli">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-red-500">
                    <RadioGroupItem value="0" id="q42" className="bg-white" />
                    <Label htmlFor="q42" className="p-1 text-white w-full">
                      Setuju, terdapat pungli di unit layanan ini
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500 p-2 rounded-lg">
                    <RadioGroupItem value="1" id="q41" className="bg-white" />
                    <Label htmlFor="q41" className="p-1 text-white w-full">
                      Tidak Setuju, tidak terdapat pungli di unit layanan ini
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full items-center gap-1.5 mb-8 border-b pb-4">
                <p>
                  Apakah menurut penilaian Bapak/Ibu/Saudara terdapat praktik
                  <strong> pencaloan/makelar/perantara/biro jasa </strong> pada
                  unit layanan ini?
                </p>
                <RadioGroup id="q1" name="pencaloan">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-red-500">
                    <RadioGroupItem value="0" id="q52" className="bg-white" />
                    <Label htmlFor="q52" className="p-1 text-white w-full">
                      Setuju, terdapat pencaloan di unit layanan ini
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500 p-2 rounded-lg">
                    <RadioGroupItem value="1" id="q51" className="bg-white" />
                    <Label htmlFor="q51" className="p-1 text-white w-full">
                      Tidak Setuju, tidak terdapat pencaloan di unit layanan ini
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>
          <Button
            type="submit"
            size="lg"
            className="mx-auto flex items-center justify-center rounded-md bg-green-500 py-4 px-20 text-base font-semibold text-white transition duration-150 ease-in-out hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white shadow-2xl"
          >
            Kirim Kuesioner
          </Button>
        </form>
        {mutation.isPending && <LoadingModal />}
        {mutation.isError && <ErrorModal />}
      </div>
    </>
  );
}

export default App;
