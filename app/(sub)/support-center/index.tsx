import { View, Text, Pressable, Linking, ScrollView } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Comprehensive FAQ data
const faqData: FaqItem[] = [
  {
    id: "1",
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule an appointment through our app by going to the Appointments section. Select your preferred doctor, choose an available date and time slot, and confirm your booking. You'll receive a confirmation notification and email with your appointment details.",
  },
  {
    id: "2",
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Medicare. Please contact our support team with your specific insurance information for detailed coverage verification.",
  },
  {
    id: "3",
    question: "How can I access my medical records?",
    answer:
      "Your medical records are available in the 'Medical Records' section of the app. You can view your test results, prescriptions, and visit history. For older records or detailed reports, you can submit a request through the app or contact our medical records department.",
  },
  {
    id: "4",
    question: "What should I do in case of a medical emergency?",
    answer:
      "For any life-threatening emergencies, immediately call 911 or go to the nearest emergency room. Our 24/7 nurse hotline is available for urgent medical advice, and you can find the nearest emergency facilities using our app's location services.",
  },
  {
    id: "5",
    question: "How do I request a prescription refill?",
    answer:
      "Prescription refills can be requested through the 'Medications' section of the app. Select the prescription you need refilled, verify your pharmacy information, and submit the request. Most refills are processed within 24-48 hours.",
  },
  {
    id: "6",
    question: "What is your cancellation policy?",
    answer:
      "We require at least 24 hours notice for appointment cancellations. Late cancellations or no-shows may incur a fee. You can cancel or reschedule appointments easily through the app or by calling our support center.",
  },
  {
    id: "7",
    question: "How do I update my personal information?",
    answer:
      "You can update your personal information including contact details, insurance information, and preferred pharmacy in the 'Profile' section of the app. Some changes may require verification for security purposes.",
  },
  {
    id: "8",
    question: "Can I request a specific doctor?",
    answer:
      "Yes, you can choose your preferred doctor when scheduling appointments. Each doctor's profile includes their specialties, availability, and patient reviews to help you make an informed decision.",
  },
  {
    id: "9",
    question: "How do I pay my medical bills?",
    answer:
      "Bills can be paid through the 'Billing' section of the app using credit cards, debit cards, or bank transfers. We also offer payment plans for eligible patients. Contact our billing department for specific arrangements.",
  },
  {
    id: "10",
    question: "How can I get my test results?",
    answer:
      "Test results are typically available within 2-3 business days and can be accessed in the 'Test Results' section of the app. You'll receive a notification when new results are available. For urgent results, your healthcare provider will contact you directly.",
  },
];

const SupportCenterScreen = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const handleCallSupport = () => {
    Linking.openURL("tel:1234567890");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">
          {t("support.frequentlyAskedQuestions")}
        </Text>
        <Text className="text-gray-500 mt-2">
          {t("support.findAnswersBelow")}
        </Text>
      </View>

      <ScrollView className="flex-1">
        <Accordion type="single" collapsable className="mt-4">
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-gray-100 bg-white mb-2"
            >
              <AccordionHeader className="px-6 py-4">
                <AccordionTrigger
                  onPress={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                  className="flex-row justify-between items-center w-full"
                >
                  <AccordionTitleText className="text-gray-800 font-medium flex-1 pr-4">
                    {item.question}
                  </AccordionTitleText>
                  <View className="bg-gray-100 rounded-full p-2">
                    <Ionicons
                      name={
                        expandedId === item.id ? "chevron-up" : "chevron-down"
                      }
                      size={16}
                      color="#4B5563"
                    />
                  </View>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className="px-6 py-4 bg-gray-50">
                <AccordionContentText className="text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollView>

      <View className="p-6 mt-auto">
        <Pressable
          onPress={handleCallSupport}
          className="bg-primary-600 rounded-xl py-4 px-6 active:bg-primary-700 shadow-sm"
        >
          <View className="flex-row gap-2 items-center justify-center space-x-3">
            <Ionicons name="call-outline" size={22} color="black" />
            <Text className="text-black font-semibold text-lg">
              {t("support.haveMoreQuestions")}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SupportCenterScreen;
