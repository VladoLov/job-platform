import React, { useState } from "react";
import { Slider } from "../ui/slider";
import { Control, useController } from "react-hook-form";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface iAppProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  currency: string;
}

export default function SalaryRange({
  control,
  minSalary,
  maxSalary,
  step,
  currency,
}: iAppProps) {
  const { field: fromField } = useController({
    name: "salaryFrom",
    control,
  });

  const { field: toField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  function handleRangeChange(value: number[]) {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  }
  return (
    <div className="w-full space-y-4">
      <Slider
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
        onValueChange={handleRangeChange}
      />
      <div className="flex justify-between">
        <span>{formatCurrency(range[0], currency)}</span>{" "}
        <span>{formatCurrency(range[1], currency)}</span>
      </div>
    </div>
  );
}
