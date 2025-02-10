import { useState, ChangeEvent } from "react";

function useInput(
  defaultValue: string = ""
): [string, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState<string>(defaultValue);

  const onValueChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler];
}

export default useInput;
