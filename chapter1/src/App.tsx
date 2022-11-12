import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";

function App() {
  return (
    <>
      <Box>
        <h1>動画再生アプリ</h1>
        <ReactPlayer
          url={
            "https://d13pitkuolwx3f.cloudfront.net/output/test.m3u8"
          }
          id="MainPlay"
          playing
          loop
          controls={true}
          width="1280px"
          height="720px"
        />
      </Box>
    </>
  );
}
export default App;
