import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import config from "src/config";
import { NextPage } from "next";
import { motion } from "framer-motion";

const Index: NextPage = () => {
  return (
    <Layout>
      <SEO />

      <div className="px-4 py-32 sm:py-40 space-y-4">
        <div>
          <div className="h-12 sm:h-16 overflow-hidden">
            <motion.h1
              initial={{ y: "calc(3rem * 2)" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-black"
            >
              Akhila
            </motion.h1>
          </div>

          <div className="h-12 sm:h-16 overflow-hidden">
            <motion.h1
              initial={{ y: "calc(3rem * -2)" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-black"
            >
              Ariyachandra
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.2 }}
          className="text-lg sm:text-xl font-medium"
        >
          {config.description}
        </motion.p>
      </div>
    </Layout>
  );
};

export default Index;
