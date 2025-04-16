function LoadingModal() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-md p-8">
        <div className="flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-gray-300 mr-1 animate-pulse"></div>
          <div className="h-4 w-4 rounded-full bg-gray-300 mr-1 animate-pulse animation-delay-200"></div>
          <div className="h-4 w-4 rounded-full bg-gray-300 animate-pulse animation-delay-400"></div>
        </div>
        <p className="text-lg mt-2 font-semibold">
          Sedang mengirim kuesioner anda
        </p>
      </div>
    </div>
  );
}

export default LoadingModal;
