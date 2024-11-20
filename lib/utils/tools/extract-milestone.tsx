interface ExtractedMilestone {
  prefix: string | null;
  number: number;
  decimals: number;
  unit: string | null;
  suffix: string | null;
}

export function extractMilestone(input: string): ExtractedMilestone {
  const regex = /^([^0-9]*)?(\d+(?:\.\d+)?)([a-zA-Z]*)?\s?(.*)?$/;
  const match = input.match(regex);

  if (!match) {
    return {
      prefix: null,
      number: 0,
      decimals: 0,
      unit: null,
      suffix: null,
    };
  }

  const [, prefix, numberStr, unit, suffix] = match;
  const number = numberStr ? parseFloat(numberStr) : 0;
  const decimals =
    numberStr && numberStr.includes('.') ? numberStr.split('.')[1].length : 0;

  return {
    prefix: prefix?.trim() || null,
    number,
    decimals,
    unit: unit?.trim() || null,
    suffix: suffix?.trim() || null,
  };
}
