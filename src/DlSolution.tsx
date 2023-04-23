import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Button,
  Select,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  GetDlPredictions,
  GetPredictions,
  getGentFromOpenAi,
} from "./api/connection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface NData {
  name: string;
}
export interface HaveP {
  havePcos: string;
}
const DlSolution = () => {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState<any>(false);
  const [name, setName] = useState<any>("");
  const navigate = useNavigate();
  const handleSub = async () => {
    setLoading(true);
    const response = await GetDlPredictions({ name: name });
    console.log(response);
    const diet = await getGentFromOpenAi({ havePcos: response.result });
    window.localStorage.setItem("havePcos", response.result);
    window.localStorage.setItem("diet", diet as string);
    if (response.result !== undefined) {
      navigate("/user");
      setLoading(false);
    } else {
      alert("No Image has been selected yet");
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      <Dropzone
        onDrop={async (files) => {
          setName(files[0].name);
        }}
        loading={loading}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Button
        fullWidth
        mt="xl"
        type={"submit"}
        className="bg-red-500"
        onClick={() => handleSub()}
      >
        Submit
      </Button>
    </>
  );
};

export default DlSolution;
