import { useRef } from "react";
import { Button } from "./components/ui/button";
import { CloudAlert } from "lucide-react";
function ErrorModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <dialog ref={dialogRef} open>
      <div className="backdrop-brightness-50 fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md max-w-md m-4">
          <CloudAlert color="red" size={40} />
          <h1 className="text-lg font-bold">Gagal Terkirim</h1>
          <p className="text-sm mt-2 mb-4">
            Terjadi kesalahan saat mengirim kuesioner, silahkan coba lagi
            beberapa saat kemudian
          </p>
          <div className="flex justify-end">
            <Button
              className="px-10"
              onClick={() => dialogRef.current?.close()}
            >
              Ok
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ErrorModal;
