import { AnimatePresence, motion } from "framer-motion";
import { appStore } from "@/store";
import { CrossIcon } from "@/svg/modal/CrossIcon";
import {
  ConfigPreferences,
  Export,
  Faq,
  Notifications,
  ProfileInfo,
  Security,
  StatsChars,
  StatsSummary,
  SupportContact,
  TutorialsAndGuides,
  UsageHistory,
} from ".";

const modalVariants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
  },
  visible: {
    clipPath: "circle(100% at 50% 50%)",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const Modal = () => {
  const modalSettings = appStore((state) => state.modalSettings);
  const resetModalSettings = appStore((state) => state.resetModalSettings);

  const areAllModalSettingsFalse = () => {
    return Object.values(modalSettings).every((value) => value === false);
  };

  return (
    <AnimatePresence>
      {areAllModalSettingsFalse() ? null : (
        <motion.div
          className="fixed
                     inset-0 flex
                     items-center
                     justify-center
                     bg-black
                     bg-opacity-50
                     z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white
                       rounded-[50px]
                       p-[40px]
                       flex flex-col
                       mx-auto"
            style={{ width: "auto", maxWidth: "90vw", overflowX: "auto" }}
            variants={modalVariants}
          >
            <div className="w-full flex justify-end">
              <button onClick={resetModalSettings}>
                <CrossIcon />
              </button>
            </div>
            {/* Contenido del modal */}
            {modalSettings.profileInfo && <ProfileInfo />}
            {modalSettings.configPreferences && <ConfigPreferences />}
            {modalSettings.usageHistory && <UsageHistory />}
            {modalSettings.statsSummary && <StatsSummary />}
            {modalSettings.statsChars && <StatsChars />}
            {modalSettings.export && <Export />}
            {modalSettings.notifications && <Notifications />}
            {modalSettings.security && <Security />}
            {modalSettings.faq && <Faq />}
            {modalSettings.supportContact && <SupportContact />}
            {modalSettings.tutorialsAndGuides && <TutorialsAndGuides />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
