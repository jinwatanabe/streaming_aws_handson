import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ImageLogo from "./image.svg";

function App() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log("acceptedFiles:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const fileUpload = () => {
    if (inputRef.current == null) return;
    inputRef.current.click();
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) return;
    console.log(event.target.files[0]);
  };

  return (
    <div className="App">
      <div className="flex justify-center items-center h-screen">
        <div
          className="rounded shadow-lg w-1/2"
          style={{ maxWidth: "400px", minWidth: "300px" }}
        >
          <div className="flex justify-center">
            <div className="my-8 flex justify-center grid">
              <h1 className="font-bold text-gray-500 col-span-3 text-center">
                動画アップロード
              </h1>
              <div className="text-gray-500 col-span-3 text-center mt-2 mb-4 text-xs">
                MP4の動画ファイルを選択
              </div>
              <div
                className="border-dashed border-2 border-gray-500 grid flex justify-cente p-4 mb-2 cursor-pointer"
                style={{ minWidth: "200px" }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="container flex justify-center mb-2">
                  <img src={ImageLogo} alt="imagelogo" />
                </div>
                <div className="container flex justify-center text-xs text-gray-500">
                  <p>ここにドラッグ＆ドロップしてね</p>
                </div>
              </div>
              <div className="col-span-3 text-center my-1 text-gray-500">
                または
              </div>
              <div className="col-span-3 flex justify-center w-full">
                <button
                  onClick={fileUpload}
                  className="bg-blue-500 rounded text-white font-bold py-2 px-4 w-full"
                >
                  ファイルを選択
                </button>
                <input
                  type="file"
                  className="hidden"
                  accept=".mp4"
                  ref={inputRef}
                  onChange={onFileInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
