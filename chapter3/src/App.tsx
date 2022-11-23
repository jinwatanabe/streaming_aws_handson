import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Credentials } from "aws-sdk";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

import ImageLogo from "./image.svg";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    const file = acceptedFiles[0];
    const creds = new Credentials(
      "[AWSアクセスキー]",
      "[AWSシークレットアクセスキー]"
    );

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: "ap-northeast-1", credentials: creds }),
        params: { Bucket: "hls-handson", Key: file.name, Body: file },
        leavePartsOnError: false,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      await parallelUploads3.done();
      await setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

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
        {isLoading ? (
          <h1>アップロード中・・・</h1>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default App;
