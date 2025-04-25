import { motion } from "framer-motion";

function Prediction(){

    return(

        <>
        
      <motion.div
      className="text-center py-12 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-red-600">
        Heart Disease Prediction
      </h1>
      <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
        Enter your health information to predict the likelihood of heart disease and take proactive steps.
      </p>
    </motion.div>

        </>
    )
}

export default Prediction