import dayjs from "dayjs";
import { useState } from "react";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface UseTimeSlotsProps {
  unavailableSlots?: {
    [date: string]: string[];
  };
}

export const useTimeSlots = ({
  unavailableSlots = {},
}: UseTimeSlotsProps = {}) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const isSlotAvailable = (slotId: string): boolean => {
    if (!selectedDate) return true;
    return !unavailableSlots[selectedDate]?.includes(slotId);
  };

  const formatTo12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${String(hour12).padStart(2, "0")}:${minutes} ${period}`;
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let i = 0; i < 24; i++) {
      const startHour = i;
      const endHour = (i + 1) % 24;

      const startTime = `${String(startHour).padStart(2, "0")}:00`;
      const endTime = `${String(endHour).padStart(2, "0")}:00`;

      const start12Hour = formatTo12Hour(startTime);
      const end12Hour = formatTo12Hour(endTime);

      slots.push({
        id: `slot-${i}`,
        startTime: start12Hour,
        endTime: end12Hour,
        isAvailable: isSlotAvailable(`slot-${i}`),
      });
    }
    return slots;
  };

  const handleSlotSelection = (slotId: string) => {
    if (!isSlotAvailable(slotId)) return;

    setSelectedSlots((prev) => {
      if (prev.includes(slotId)) {
        if (slotId === prev[0]) {
          return prev.slice(1);
        } else if (slotId === prev[prev.length - 1]) {
          return prev.slice(0, -1);
        } else {
          const index = prev.indexOf(slotId);
          return prev.slice(0, index);
        }
      } else {
        const currentSlotNumber = parseInt(slotId.split("-")[1]);

        if (prev.length === 0) {
          return [slotId];
        }

        const lastSelectedSlotNumber = parseInt(
          prev[prev.length - 1].split("-")[1]
        );
        const firstSelectedSlotNumber = parseInt(prev[0].split("-")[1]);

        const isConsecutiveWithEnd =
          Math.abs(currentSlotNumber - lastSelectedSlotNumber) === 1 ||
          (currentSlotNumber === 23 && lastSelectedSlotNumber === 0) ||
          (currentSlotNumber === 0 && lastSelectedSlotNumber === 23);

        const isConsecutiveWithStart =
          Math.abs(currentSlotNumber - firstSelectedSlotNumber) === 1 ||
          (currentSlotNumber === 23 && firstSelectedSlotNumber === 0) ||
          (currentSlotNumber === 0 && firstSelectedSlotNumber === 23);

        if (isConsecutiveWithEnd) {
          return [...prev, slotId];
        } else if (isConsecutiveWithStart) {
          return [slotId, ...prev];
        }

        return [slotId];
      }
    });
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedSlots([]);
  };

  return {
    selectedDate,
    selectedSlots,
    handleDateSelection,
    handleSlotSelection,
    generateTimeSlots,
    isSlotAvailable,
  };
};
