import React from "react";
import { CustomButton } from "components/Shared/Buttons";
import { Icon } from "components/Shared/Icon";
import * as styledModules from "./date-range-picker.module.scss";
import { PickerType } from ".";
import { colors, typography } from "styles/constants";

const primaryColor = colors.ColorAccentBlue;
const secondaryColor = colors.ColorTextLightestBeige;

interface IDateOrTimePickerToggleProps {
  active?: PickerType;
  onClick: (nextContent: PickerType) => void;
}

export function DateOrTimePickerToggle({ active = undefined, onClick }: IDateOrTimePickerToggleProps) {
  const primaryStyle = {
    width: "120px",
    height: "36px",
    backgroundColor: primaryColor,
    borderColor: "transparent",
    color: secondaryColor,
    margin: "0.2rem",
    fontSize: "14px"
  };
  const secondaryStyle = {
    width: "120px",
    height: "36px",
    backgroundColor: secondaryColor,
    borderColor: "transparent",
    color: primaryColor,
    margin: "0.2rem",
    fontSize: typography.SizeFont14
  };
  const datePickerButtonStyle = active === PickerType.DatePicker ? primaryStyle : secondaryStyle;
  const datePickerIconColor = active === PickerType.DatePicker ? "white" : "blue";
  const timePickerButtonStyle = active === PickerType.TimePicker ? primaryStyle : secondaryStyle;
  const timePickerIconColor = active === PickerType.TimePicker ? "white" : "blue";

  return (
    <div className={styledModules.pickerTypeToggleButtons}>
      <CustomButton variant="primary" onClick={() => onClick(PickerType.DatePicker)} style={datePickerButtonStyle}>
        <Icon size="small" className="ui date" color={datePickerIconColor} style={{ marginRight: "10px" }} />
        Date
      </CustomButton>
      <CustomButton variant="primary" onClick={() => onClick(PickerType.TimePicker)} style={timePickerButtonStyle}>
        <Icon size="small" className="ui clock" color={timePickerIconColor} style={{ marginRight: "10px" }} />
        Time
      </CustomButton>
    </div>
  );
}
