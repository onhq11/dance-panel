import { CrudConfig } from "@lib/utils/_shared/types";

export const q = (x: string) => `\`${x}\``;

export const assignEditableValues = (
  cfg: CrudConfig,
  payload: any,
  data: any,
) => {
  for (const k of cfg.editable) {
    if (payload[k] !== undefined) {
      data[k] = payload[k];
    }
  }

  if (!Object.keys(data).length) {
    throw new Error("No editable fields provided.");
  }
};
