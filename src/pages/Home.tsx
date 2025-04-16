import {IconButton, Radio, TextInput} from "@/components/input";
import {Checkbox} from "@/components/input";

export const Home = () => {
  return (
    <div className={"flex flex-col w-full max-w-[1000px] mx-auto items-center justify-center gap-2"}>
      <IconButton icon={"link"} size={"S"}/>
      <IconButton icon={"link"} />
      <IconButton icon={"link"} palette={"gray"} size={"S"}/>
      <IconButton icon={"link"} palette={"gray"}/>

      <Checkbox text={"Nteasdsa"}/>
      <Radio text={"Nteasdsa"}/>

      <TextInput title={"sd"}/>
      <TextInput title={"sd"} inputSize={"S"}/>
      <TextInput title={"sd"}/>
    </div>
  )
}
