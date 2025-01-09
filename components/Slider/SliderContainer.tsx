import { View, Text } from "react-native";
import { styles, trackMarkStyles } from "./styles";
import React from "react";
import { Slider } from "@miblanchard/react-native-slider";

const DEFAULT_VALUE = 0.2;

const SliderContainer = (props: {
  children: React.ReactElement;
  sliderValue?: number[];
  trackMarks?: number[];
  vertical?: boolean;
}) => {
  const { sliderValue, trackMarks } = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE
  );
  let renderTrackMarkComponent: (index: number) => React.ReactNode;
  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark;
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };

  return <View style={styles.sliderContainer}>{renderChildren()}</View>;
};

export default SliderContainer;
