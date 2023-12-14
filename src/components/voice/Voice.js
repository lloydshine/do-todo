import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { FaStop, FaMicrophoneAlt } from "react-icons/fa";
import { auth } from "../../firebase/firebase";

function extractInformation(inputString) {
  const match = inputString.match(/(.+?)\s(\w+)\s(\w+)$/);

  if (match) {
    const task = match[1];
    const category = match[2];
    const isImportant = match[3];

    return { task, category, isImportant };
  } else {
    console.log("Pattern not matched");
    return null;
  }
}

const logout = async () => {
  await auth.signOut();
};

export default function Voice({ handleAdd }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const command = () => {
    const commands = transcript.split(/(?<=^\S+)\s/);
    console.log(commands);
    switch (commands[0]) {
      case "add":
        const { task, category, isImportant } = extractInformation(commands[1]);
        if (!task || !category || !isImportant) return;
        handleAdd(task, category, isImportant === "important");
        break;
      case "logout":
        logout();
        break;
      case "dark":
        document.body.setAttribute("data-theme", "dark");
        break;
      case "light":
        document.body.setAttribute("data-theme", "light");
        break;
      default:
        console.log("Command not Found");
    }
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <>
      {listening ? (
        <FaStop size={30} onClick={command} />
      ) : (
        <FaMicrophoneAlt size={30} onClick={SpeechRecognition.startListening} />
      )}
    </>
  );
}
