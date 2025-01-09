import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Slider } from "@miblanchard/react-native-slider";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { dummyProducts } from "../../../dummy/product";

// You'll need to create these types based on your data structure
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  // Add other relevant fields
}

export default function ProductsScreen() {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const snapPoints = ["50%"];
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [paymentTypes, setPaymentTypes] = useState({
    subscription: false,
    payout: false,
  });

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity
        className="flex-1 m-2 bg-white rounded-lg shadow-sm p-4"
        onPress={() => router.push(`/(sub)/product-management/${item.id}`)}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            className="w-full h-32 rounded-md"
            resizeMode="cover"
          />
          <Text className="mt-2 font-medium">{item.name}</Text>
          <Text className="text-gray-600">${item.price}</Text>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white">
        <Text className="text-xl font-bold">{t("products.title")}</Text>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.expand()}
          className="p-2"
        >
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlashList
        data={products}
        renderItem={renderProduct}
        estimatedItemSize={200}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
      />

      {/* Filter Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        android_keyboardInputMode="adjustResize"
        enableOverDrag={false}
        handleComponent={null}
        style={{
          zIndex: 1000,
        }}
      >
        <BottomSheetView className="flex-1 p-6">
          <Text className="text-lg font-bold mb-4">
            {t("products.filters")}
          </Text>

          {/* Price Range Filter */}
          <View className="mb-6">
            <Text className="text-base font-medium mb-2">
              {t("products.priceRange")}
            </Text>
            {/* Price Display */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 bg-white border border-gray-200 rounded-lg p-2">
                <Text className="text-center">
                  {t("common.currency", { n: Math.round(priceRange[0]) })}
                </Text>
              </View>
              <Text className="mx-2">~</Text>
              <View className="flex-1 bg-white border border-gray-200 rounded-lg p-2">
                <Text className="text-center">
                  {t("common.currency", { n: Math.round(priceRange[1]) })}
                </Text>
              </View>
            </View>

            <View className="flex-1 mt-[20] ml-[10] mr-[10] items-stretch justify-center">
              <Slider
                animateTransitions
                maximumTrackTintColor="#d3d3d3"
                maximumValue={MAX_PRICE}
                minimumTrackTintColor="#1fb28a"
                minimumValue={MIN_PRICE}
                value={priceRange}
                step={50}
                onValueChange={(value) => handlePriceRangeChange(value)}
                thumbTintColor="#1a9274"
              />
            </View>
          </View>

          {/* Payment Type Filter */}
          <View className="mb-6">
            <Text className="text-base font-medium mb-2">
              {t("products.paymentType")}
            </Text>
            <View className="space-y-2 flex-col gap-2">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() =>
                  setPaymentTypes((prev) => ({
                    ...prev,
                    subscription: !prev.subscription,
                  }))
                }
              >
                <View
                  className={`w-6 h-6 border rounded mr-2 items-center justify-center ${
                    paymentTypes.subscription
                      ? "bg-[#50cebb] border-[#50cebb]"
                      : "border-gray-300"
                  }`}
                >
                  {paymentTypes.subscription && (
                    <Text className="text-white">✓</Text>
                  )}
                </View>
                <Text>{t("products.subscription")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() =>
                  setPaymentTypes((prev) => ({
                    ...prev,
                    payout: !prev.payout,
                  }))
                }
              >
                <View
                  className={`w-6 h-6 border rounded mr-2 items-center justify-center ${
                    paymentTypes.payout
                      ? "bg-[#50cebb] border-[#50cebb]"
                      : "border-gray-300"
                  }`}
                >
                  {paymentTypes.payout && <Text className="text-white">✓</Text>}
                </View>
                <Text>{t("products.payout")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add more filters here */}

          {/* Filter Actions */}
          <View className="flex-row gap-4 mt-4">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1"
              onPress={() => bottomSheetRef.current?.close()}
            >
              <View className="py-3 h-12 rounded-xl bg-gray-200">
                <Text className="text-center font-semibold">
                  {t("common.cancel")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                // Apply filters
                bottomSheetRef.current?.close();
              }}
              className="flex-1"
            >
              <View className="py-3 h-12 rounded-xl bg-[#50cebb]">
                <Text className="text-white text-center font-semibold">
                  {t("common.apply")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
