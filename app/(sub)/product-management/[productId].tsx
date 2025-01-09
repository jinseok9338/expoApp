import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { productDetail } from "@/dummy/productDetail";

const window = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  // In a real app, you would fetch the product data from an API
  const product = productDetail;

  // Use the images array directly from the product
  const images = product?.images || [];

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{t("products.notFound")}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Image Carousel */}
      <View className="relative">
        <Carousel
          loop
          width={window.width}
          height={window.width}
          data={images}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={({ item }) => (
            <View className="w-full h-full">
              <Image
                source={{ uri: item }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          )}
          autoPlay={images.length > 1} // Only autoplay if there are multiple images
          autoPlayInterval={3000}
        />
        {/* Pagination Dots - Only show if there are multiple images */}
        {images.length > 1 && (
          <View className="absolute gap-1 bottom-4 flex-row justify-center w-full space-x-2">
            {images.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="p-4 space-y-4">
        {/* Product Name and Price */}
        <View className="space-y-2">
          <Text className="text-2xl font-bold">{product.name}</Text>
          <Text className="text-xl text-gray-600">
            {t("common.currency", { n: product.price })}
          </Text>
        </View>

        {/* Category */}
        <View className="flex-row items-center">
          <Text className="text-gray-500">{t("products.category")}:</Text>
          <Text className="ml-2">{product.category}</Text>
        </View>

        {/* Description */}
        <View className="space-y-2">
          <Text className="text-lg font-semibold">
            {t("products.description")}
          </Text>
          <Text className="text-gray-600 leading-6">
            {product.description || t("products.noDescription")}
          </Text>
        </View>

        {/* Specifications */}
        <View className="space-y-2">
          <Text className="text-lg font-semibold">
            {t("products.specifications")}
          </Text>
          <View className="bg-gray-50 p-4 rounded-lg">
            {product.specifications?.map((spec, index) => (
              <View
                key={index}
                className="flex-row justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <Text className="text-gray-600">{spec.name}</Text>
                <Text>{spec.value}</Text>
              </View>
            )) || (
              <Text className="text-gray-500">
                {t("products.noSpecifications")}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
