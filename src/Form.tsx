import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { GetPredictions, getData, getDatatFromOpenAi } from "./api/connection";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dietState } from "./atom";
import { useRef, useState } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

export interface FormDataI {
  age: number;
  weight: number;
  height: number;
  cycle: number;
  food: number;
  cycleLength: number;
  hair: number;
  skinDarkening: number;
}

export interface FormDataNewI {
  age: number;
  marriageStatus: number;
  weight: number;
  bmi: number;
  follicleNoR: number;
  follicleNoL: number;
  amh: number;
  regularCycle: number;
  cycleLength: number;
  skinDarkening: number;
  hairGrowth: number;
  weightGain: number;
  fastFood: number;
  pimples: number;
}

const Form = () => {
  const openRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<FormDataNewI>({
    initialValues: {
      age: 0,
      marriageStatus: 0,
      weight: 0,
      bmi: 0,
      follicleNoR: 0,
      follicleNoL: 0,
      amh: 0,
      regularCycle: 0,
      cycleLength: 0,
      skinDarkening: 0,
      hairGrowth: 0,
      weightGain: 0,
      fastFood: 0,
      pimples: 0,
    },
  });
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(dietState);
  const [loca, setloca] = useState<string>("");

  const handleSubmission = async (values: FormDataNewI) => {
    setLoading(true);
    const response = await GetPredictions({ ...values });
    const data = await getDatatFromOpenAi({
      age: values.age,
      weight: values.weight,
      height: values.weight,
      cycle: values.regularCycle,
      food: values.fastFood,
      havePcos: response.result,
      vegetarian: true,
      skinDarkening: values.skinDarkening,
      cycleLength: values.cycleLength,
      hair: values.hairGrowth,
    });
    setState({
      havePcos: response.result,
      dietPlan: data as string,
    });
    window.localStorage.setItem("havePcos", response.result);
    window.localStorage.setItem("diet", data as string);
    if (response.result !== undefined) {
      setLoading(false);
      navigate("/user");
    } else {
      setLoading(false);
      alert("Fill all columns");
    }
  };
  return (
    <Container
      size={420}
      my={40}
      className="before:absolute before:contents-[''] before:bg-gradient-to-r before:translate-x-8 before:translate-y-52 before:h-60 before:w-60 before:rounded-full before:from-blue-700 before:to-green-600 before:blur-[90px]"
    >
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form onSubmit={form.onSubmit((values) => handleSubmission(values))}>
          <TextInput
            label="Age"
            type={"number"}
            placeholder="Age"
            required
            {...form.getInputProps("age")}
          />
          <TextInput
            label="Weight"
            type={"number"}
            placeholder="Weight"
            required
            {...form.getInputProps("weight")}
          />
          <TextInput
            label="BMI"
            type={"number"}
            placeholder="BMI"
            required
            {...form.getInputProps("bmi")}
          />
          <TextInput
            label="Height"
            placeholder="Height"
            type={"number"}
            required
            {...form.getInputProps("height")}
          />
          <TextInput
            label="follicleNoR"
            placeholder="follicleNoR"
            type={"number"}
            required
            {...form.getInputProps("follicleNoR")}
          />
          <TextInput
            label="follicleNoL"
            placeholder="follicleNoL"
            type={"number"}
            required
            {...form.getInputProps("follicleNoL")}
          />
          <TextInput
            label="AMH"
            placeholder="AMH"
            type={"number"}
            required
            {...form.getInputProps("amh")}
          />
          <TextInput
            label="RegularCycle"
            placeholder="RegularCycle"
            type={"number"}
            required
            {...form.getInputProps("regularCycle")}
          />
          <TextInput
            label="Cycle Length"
            placeholder="Cycle Length"
            type={"number"}
            required
            {...form.getInputProps("cycleLength")}
          />
          <TextInput
            label="Marraige Status (Yrs)"
            placeholder="Marraige Status (Yrs)"
            type={"number"}
            required
            {...form.getInputProps("marriageStatus")}
          />
          <Select
            label="Fast Food(Y/N)"
            placeholder="Fast Food (Y/N)"
            data={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
            {...form.getInputProps("fastFood")}
          />
          <Select
            label="Weight Gain(Y/N)"
            placeholder="Weight Gain(Y/N)"
            data={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
            {...form.getInputProps("weightGain")}
          />
          <Select
            label="Hair Growth(Y/N)"
            placeholder="Hair Growth(Y/N)"
            data={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
            {...form.getInputProps("hairGrowth")}
          />
          <Select
            label="Skin darkening(Y/N)"
            placeholder="Skin darkening(Y/N)"
            data={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
            {...form.getInputProps("skinDarkening")}
          />
          <Select
            label="pimples"
            placeholder="pimples"
            data={[
              { value: "1", label: "Yes" },
              { value: "0", label: "No" },
            ]}
            {...form.getInputProps("pimples")}
          />

          <Button fullWidth mt="xl" type={"submit"} className="bg-red-500">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
function useDisclosure(arg0: boolean): [any, { toggle: any }] {
  throw new Error("Function not implemented.");
}
