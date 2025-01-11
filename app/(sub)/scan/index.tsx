import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { CameraView, Camera } from "expo-camera";

import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{t("scanner.requesting_permission")}</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-center mb-4">{t("scanner.no_permission")}</Text>
          <Button
            onPress={async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setHasPermission(status === "granted");
            }}
          >
            <Text>{t("scanner.request_permission")}</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <CameraView
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "code128"],
          }}
          onBarcodeScanned={(result) => {
            if (!scanned) {
              setScanned(true);
              console.log(result.data);
              if (result.data.includes("https://")) {
                // open url
                Linking.openURL(result.data);
              }
              // router.push(`/(main)`);
            }
          }}
        />

        {/* Scan overlay */}
        <View className="flex-1 items-center justify-center">
          <View className="w-72 h-72 border-2 border-white rounded-lg">
            <View className="flex-1 relative">
              {/* Corner markers */}
              <View className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white" />
              <View className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white" />
              <View className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white" />
              <View className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white" />
            </View>
          </View>
          <Text className="text-white text-center mt-4">
            {t("scanner.scan.align_code")}
          </Text>
        </View>

        {scanned && (
          <View className="absolute bottom-10 left-0 right-0 items-center">
            <Button className="rounded-md" onPress={() => setScanned(false)}>
              <Text>{t("scanner.scan.scan_again")}</Text>
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
