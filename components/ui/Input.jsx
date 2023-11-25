import { Text, TextInput, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default function Input({ label, ...rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    marginBottom: "1.6rem",
  },
  label: {
    fontSize: "1.1rem",
    fontFamily: "$font500",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
    paddingLeft: "0.8rem",
    marginBottom: "0.5rem",
  },
  input: {
    borderRadius: "0.875rem",
    backgroundColor: "#EFF2F5",
    padding: "0.9rem 0.8rem",
  },
});
