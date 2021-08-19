import React from "react";
import { format } from "date-fns";
import { Calendar } from "../Calendar";
import { TimePicker, ITime } from "../TimePicker/timePicker";
import { CustomButton, PrimaryButton, SecondaryButton } from "components/Shared/Buttons";
import { Icon } from "components/Shared/Icon";
import * as styledModules from "./date-range-picker.module.scss";
import { DateTimeInputField } from "./DateTimeInputField";
import { DateOrTimePickerToggle } from "./dateOrTimePickerToggle";

import {
  DateRangeMenuContentContainer as ContentContainer,
  DateRangeMenuFooter as ContentFooter,
  DateRangeMenuItem as MenuItem
} from "./Containers";

export enum PickerType {
  DatePicker,
  TimePicker
}

interface IChildProps {
  className?: string;
  style?: React.CSSProperties;
}

interface IHeaderProps extends IChildProps {}
interface IWrapperProps extends IChildProps {}
interface IBodyProps extends IChildProps {}

interface IDateRangePickerProps {
  startOpen?: boolean;
  minDate: Date;
  maxDate: Date;
  selectedStart?: Date;
  selectedEnd?: Date;
  minuteStep?: number;
  wrapperProps?: IWrapperProps;
  headerProps?: IHeaderProps;
  bodyProps?: IBodyProps;
  events?: {
    onTimeSelectionChange?: ({ start, end }: { start: Date; end: Date }) => void;
  };
}

interface IDateRangePickerState {
  currentPicker: PickerType;
  open: boolean;
  minDate: Date;
  maxDate: Date;
  selectedStart: Date;
  selectedEnd: Date;
  beforeOpen: IDateRangePickerState;
}

function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy hh:mm a");
}

function StartDateField({ selectedStart }: { selectedStart: Date }) {
  return <span>{selectedStart && formatDate(selectedStart)}</span>;
}

function EndDateField({ selectedEnd }: { selectedEnd: Date }) {
  return <span style={{ marginRight: "42px" }}>{selectedEnd && formatDate(selectedEnd)}</span>;
}

export class DateRangePicker extends React.Component<IDateRangePickerProps, IDateRangePickerState> {
  menuContainerRef: any = undefined;
  fieldContainerRef: any = undefined;

  constructor(props: IDateRangePickerProps) {
    super(props);
    this.menuContainerRef = React.createRef();
    this.fieldContainerRef = React.createRef();
    this.state = {
      currentPicker: PickerType.TimePicker,
      open: props.startOpen || false,
      minDate: props.minDate,
      maxDate: props.maxDate,
      selectedStart: props.selectedStart,
      selectedEnd: props.selectedEnd,
      // selectedStart: this.getSelectedStart(this.props.selectedStart, this.props.minDate),
      // selectedEnd: this.getSelectedEnd(this.props.selectedEnd, this.props.maxDate),
      beforeOpen: undefined
    };
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  // debounceStartPick = debounce(
  //   (start: Date) => {
  //     if (this.props.events?.onStartDateChanged) {
  //       this.props.events.onStartDateChanged(start);
  //     }
  //   },
  //   EventCallbackDebounceDelay,
  //   { leading: true }
  // );

  // debounceEndPick = debounce(
  //   (end: Date) => {
  //     if (this.props.events?.onEndDateChanged) {
  //       this.props.events.onEndDateChanged(end);
  //     }
  //   },
  //   EventCallbackDebounceDelay,
  //   { leading: false }
  // );

  handleMinDatePropChange(minDate: Date) {
    if (this.state.selectedStart && this.state.selectedStart < minDate) {
      this.setState({ selectedStart: minDate });
    }
  }

  handleMaxDatePropChange(maxDate: Date) {
    if (this.state.selectedEnd && this.state.selectedEnd > maxDate) {
      this.setState({ selectedEnd: maxDate });
    }
  }

  handleMinDateChange(minDate: Date) {
    this.setState((prevState) => ({
      ...prevState,
      minDate: minDate
    }));
  }

  handleMaxDateChange(maxDate: Date) {
    this.setState({
      maxDate: maxDate
    });
  }

  setPickedStart(start: Date) {
    if (start < this.state.minDate) {
      console.warn(`Picked start date outside bounds: ${start?.toString()}, min: ${this.state.minDate}`);
      return;
    }
    this.setState({ selectedStart: start });
  }

  setPickedEnd(end: Date) {
    if (end > this.state.maxDate) {
      console.warn(`Picked end date outside bounds: ${end?.toString()}, min: ${this.state.maxDate}`);
      return;
    }
    this.setState({ selectedEnd: end });
  }

  handlePickerTypeSwitch(nextPicker: PickerType) {
    this.setState({ currentPicker: nextPicker });
  }

  handleStartDateSelection(start: Date) {
    start.setHours(this.state.selectedStart?.getHours());
    start.setMinutes(this.state.selectedStart?.getMinutes());
    this.setPickedStart(start);
  }

  handleEndDateSelection(end: Date) {
    end.setHours(this.state.selectedEnd?.getHours());
    end.setMinutes(this.state.selectedEnd?.getMinutes());
    this.setPickedEnd(end);
  }

  handleEndTimeChange(end: ITime) {
    const newEndDate = new Date(this.state.selectedEnd);
    newEndDate.setHours(end.hours);
    newEndDate.setMinutes(end.minutes);
    this.setPickedEnd(newEndDate);
  }

  onClickOutside(event: any) {
    if (!this.state.open) return;

    const isOutsideMenu = this.menuContainerRef && !this.menuContainerRef.current?.contains(event.target);

    const isOutsideField = this.fieldContainerRef && !this.fieldContainerRef.current?.contains(event.target);

    if (isOutsideMenu && isOutsideField) {
      this.onAbort();
    }
  }

  onStartTimeChange(start: ITime) {
    const newStartDate = new Date(this.state.selectedStart);
    newStartDate.setHours(start.hours);
    newStartDate.setMinutes(start.minutes);
    this.setPickedStart(newStartDate);
  }

  onStartDateFieldInputChange(date: Date) {
    this.setPickedStart(date);
  }

  onEndDateFieldInputChange(date: Date) {
    this.setPickedEnd(date);
  }

  handleOpen() {
    if (this.state.open) return;
    this.setState((prevState) => ({ ...prevState, open: true, beforeOpen: Object.assign({}, prevState) }));
  }

  onApply() {
    const start = this.state.selectedStart;
    const end = this.state.selectedEnd;
    if (!start || !end) {
      alert("Invalid dates selected...");
      this.setState((prevState) => ({ ...prevState.beforeOpen }));
      return;
    }
    this.setState(
      (prevState) => ({ ...prevState, open: false, beforeOpen: undefined }),
      () => {
        if (this.props.events?.onTimeSelectionChange) this.props.events.onTimeSelectionChange({ start, end });
      }
    );
  }

  onAbort() {
    this.setState((prevState) => ({ ...prevState.beforeOpen }));
  }

  onOpen() {
    this.handleOpen();
  }

  onDateFieldClick() {
    this.handlePickerTypeSwitch(PickerType.DatePicker);
    this.handleOpen();
  }

  onTimeFieldClick() {
    this.handlePickerTypeSwitch(PickerType.TimePicker);
    this.handleOpen();
  }

  onCalendarButtonToggle() {
    if (this.state.open) return this.onAbort();
    this.onOpen();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  componentDidUpdate(prevProps: IDateRangePickerProps) {
    if (prevProps.minDate !== this.props.minDate) {
      this.handleMinDateChange(this.props.minDate);
    }
    if (prevProps.maxDate !== this.props.maxDate) {
      this.handleMaxDateChange(this.props.maxDate);
    }
    if (prevProps.selectedStart !== this.props.selectedStart) {
      this.setState({ selectedStart: this.props.selectedStart });
    }
    if (prevProps.selectedEnd !== this.props.selectedEnd) {
      this.setState({ selectedEnd: this.props.selectedEnd });
    }
  }

  render() {
    const { selectedStart, selectedEnd, minDate, maxDate, currentPicker } = this.state;

    const showDatePicker = currentPicker === PickerType.DatePicker;
    const showTimePicker = currentPicker === PickerType.TimePicker;

    const wrapperProps = this.props.wrapperProps;
    const headerProps = this.props.headerProps;
    const bodyProps = this.props.bodyProps;

    return (
      <div
        className={`${styledModules.componentWrapper}${wrapperProps.className ? " " + wrapperProps.className : ""}`}
        style={wrapperProps?.style}
      >
        <div
          className={`${styledModules.headerContainer}${headerProps.className ? " " + headerProps.className : ""}`}
          style={headerProps?.style}
          ref={this.fieldContainerRef}
        >
          <CustomButton
            variant="tertiary"
            style={{
              color: "white",
              width: "32px",
              height: "32px",
              fontSize: "14px",
              marginRight: "10px",
              marginBottom: "0px",
              borderColor: "transparent"
            }}
            onClick={() => this.onCalendarButtonToggle()}
          >
            <Icon size="small" className="ui date" color="blue" style={{ marginRight: "0px" }} />
          </CustomButton>
          <DateTimeInputField
            onDateFieldClicked={() => this.onDateFieldClick()}
            onTimeFieldClicked={() => this.onTimeFieldClick()}
            onDateChanged={(date) => this.onStartDateFieldInputChange(date)}
            startDate={this.state?.selectedStart}
          />
          {/* <StartDateField selectedStart={selectedStart} />  */}
          <Icon
            className="ui arrow-right"
            color="blue"
            size="smallest"
            style={{ marginLeft: "6px", marginRight: "6px" }}
          />
          {/* <EndDateField selectedEnd={selectedEnd} /> */}
          <DateTimeInputField
            onDateFieldClicked={() => this.onDateFieldClick()}
            onTimeFieldClicked={() => this.onTimeFieldClick()}
            onDateChanged={(date) => this.onEndDateFieldInputChange(date)}
            startDate={this.state?.selectedEnd}
          />
        </div>
        {this.state.open ? (
          <ContentContainer
            ref={this.menuContainerRef}
            className={`${bodyProps.className ? " " + bodyProps.className : ""}`}
            style={bodyProps?.style}
          >
            <MenuItem>
              <div className={styledModules.dateTimeRangePickerContent}>
                <DateOrTimePickerToggle
                  active={currentPicker}
                  onClick={(picker) => this.handlePickerTypeSwitch(picker)}
                />
                {showDatePicker && (
                  <Calendar
                    selected={selectedStart}
                    minDate={minDate}
                    startDate={selectedStart}
                    endDate={selectedEnd}
                    maxDate={selectedEnd}
                    events={{
                      onDateSelection: (date) => this.handleStartDateSelection(date)
                    }}
                  />
                )}
                {showTimePicker && (
                  <TimePicker
                    hours={selectedStart?.getHours() || 0}
                    minutes={selectedStart?.getMinutes() || 0}
                    onTimeChange={selectedStart ? (time: ITime) => this.onStartTimeChange(time) : undefined}
                  />
                )}
              </div>
            </MenuItem>
            <MenuItem>
              <div className={styledModules.dateTimeRangePickerContent}>
                <DateOrTimePickerToggle
                  active={currentPicker}
                  onClick={(picker) => this.handlePickerTypeSwitch(picker)}
                />
                {showDatePicker && (
                  <Calendar
                    selected={selectedEnd}
                    minDate={selectedStart}
                    startDate={selectedStart}
                    endDate={selectedEnd}
                    maxDate={maxDate}
                    reverse
                    events={{
                      onDateSelection: (date) => this.handleEndDateSelection(date)
                    }}
                  />
                )}
                {showTimePicker && (
                  <TimePicker
                    hours={selectedEnd?.getHours() || 0}
                    minutes={selectedEnd?.getMinutes() || 0}
                    onTimeChange={selectedEnd ? (time: ITime) => this.handleEndTimeChange(time) : undefined}
                  />
                )}
              </div>
            </MenuItem>
            <ContentFooter>
              <PrimaryButton className={styledModules.footerItem} onClick={() => this.onApply()}>
                Apply
              </PrimaryButton>
              <SecondaryButton className={styledModules.footerItem} onClick={() => this.onAbort()}>
                Abort
              </SecondaryButton>
            </ContentFooter>
          </ContentContainer>
        ) : null}
      </div>
    );
  }
}
