import React from "react";
import { Select } from 'antd';

export interface SelectViewableProps {
  setViewableSize: (limit: number) => void,
  viewableSize:number,
}

export const SelectViewableSize: React.FC<SelectViewableProps> = ({setViewableSize, viewableSize}) => {
  const { Option } = Select;
  const handleChange = (value: string) => {
    setViewableSize(parseInt(value));
  };

  return (
    <>
      <Select defaultValue={viewableSize.toString()} style={{ width:65 }} onChange={handleChange}>
        <Option value="50">50</Option>
        <Option value="100">100</Option>
        <Option value="150">150</Option>
        <Option value="200">200</Option>
        <Option value="250">250</Option>
        <Option value="300">300</Option>
      </Select>
    </>
  );
};
