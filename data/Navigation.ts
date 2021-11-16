import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Done: { doneTasks: Array<string> };
};

export type DoneProps = NativeStackScreenProps<RootStackParamList, "Done">;
export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
