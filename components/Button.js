import React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const Button = ({
  text,
  onPress,
  type = "filled",
  rounded = false,
  size = "large",
  color = "#e7e7e7",
  disabled = false,
}) => {
  if (disabled == true) {
    color = "#D3D3D3";
  }
  const large = width / 1.3;
  const small = width / 2;
  const btnSize = size === "large" ? large : small;
  const btnBgColor = type === "filled" ? color : "transparent";
  const btnTextColor = type === "filled" ? "#ffffff" : color;
  const btnBorderRadius = rounded ? 30 : 10;
  const border = type === "outlined" && { borderColor: color, borderWidth: 2 };

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    paddingVertical: 8,
    width: btnSize,
    borderRadius: btnBorderRadius,
  };

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  };

  const buttonStyle = {
    marginTop: 10,
  };

  return (
    <View style={[buttonStyle]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[containerCommonStyle, border]}>
          <Text style={[textCommonStyle]}> {text} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
