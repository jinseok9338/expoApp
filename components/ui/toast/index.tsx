import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export { Toast };

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22c55e" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "500",
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#ef4444" }}
      text1Style={{
        fontSize: 15,
        fontWeight: "500",
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),
};
