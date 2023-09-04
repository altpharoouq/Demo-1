type Type = "text" | "chip" | "amount";

const stripper = <T>(
  data: any,
  structure: {
    label: string;
    target: string;
    type: Type;
  }[]
): {
  header: {
    label: string;
    target: string;
  }[];
  fields:
    | {
        value: string;
        type: Type;
      }[][]
    | any;
} => {
  const header = structure.map((x) => ({
    label: x.label,
    target: x.target,
  }));

  // const fields = data.map((x: any) =>
  //   structure.map((y) => {
  //     const { target, type } = y;
  //     return { value: x[target], type };
  //   })
  // );

  const fields = structure.map((x) => {
    const { target, type } = x;
    const value = data?.[target];

    return { value, type };
  });

  return {
    header,
    fields,
  };
};

export default stripper;
