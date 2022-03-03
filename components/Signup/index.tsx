import React, { useState, useMemo } from "react";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Axios from "@api";
import SignUpForm from "./SignupForm";
import AddressForm from "./AddressForm";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { FormikForm } from "./styled";
import { getSignupFormArg } from "./SignupForm/Submit";
import { getAddressFormArg } from "./AddressForm/Submit";
import {
  getSignupCompleteFormModel,
  getSignupCompleteInitialValues,
  getSignupCompleteValidationSchema,
} from "./FormModel";
import { SignupContainer } from "./styled";

import type { SetFieldValue } from "@my-types/formik";
import type { SignupCompleteFormValues } from "./FormModel";

const Signup: React.FC = () => {
  const router = useRouter();
  const formModel = useMemo(() => getSignupCompleteFormModel(), []);
  const signupCompleteValidationSchema = useMemo(
    () => getSignupCompleteValidationSchema(formModel),
    [formModel]
  );
  const [isAddressForm, setIsAddresForm] = useState(false);

  const submitHandler = async (values: SignupCompleteFormValues) => {
    try {
      const response = await Axios.post("/auth/signup", {
        userFormData: getSignupFormArg(values),
        addressFormData: getAddressFormArg(values),
      });
    } catch (e) {
      const error = e as Error;
      console.log(error);
    }
  };

  const addressFormBackHandler = (setFieldValues: SetFieldValue<SignupCompleteFormValues>) => {
    return () => {
      setIsAddresForm(false);
      setFieldValues("isAddressForm", false);
    };
  };

  const signupFormNextHandler = (setFieldValues: SetFieldValue<SignupCompleteFormValues>) => {
    return () => {
      setIsAddresForm(true);
      setFieldValues("isAddressForm", true);
    };
  };

  const signupFormBackHandler = () => {
    router.push("/login");
  };

  return (
    <SignupContainer>
      <Formik
        validateOnMount
        enableReinitialize
        onSubmit={submitHandler}
        validationSchema={signupCompleteValidationSchema}
        initialValues={getSignupCompleteInitialValues()}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <CustomAnimatePresence exitBeforeEnter>
            <motion.div
              key={isAddressForm ? "address-form" : "signup-form"}
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: isAddressForm ? 20 : -20 }}
              exit={{ opacity: 0, x: isAddressForm ? 20 : -20 }}
              transition={{ duration: 0.25 }}
            >
              <FormikForm>
                {!isAddressForm && (
                  <SignUpForm
                    isValid={isValid}
                    isTouched={dirty}
                    formikValues={values}
                    formModel={formModel}
                    setFieldValue={setFieldValue}
                    onNext={signupFormNextHandler(setFieldValue)}
                    onBack={signupFormBackHandler}
                  />
                )}

                {isAddressForm && (
                  <AddressForm
                    isValid={isValid}
                    isTouched={dirty}
                    formikValues={values}
                    formModel={formModel}
                    onBack={addressFormBackHandler(setFieldValue)}
                  />
                )}
              </FormikForm>
            </motion.div>
          </CustomAnimatePresence>
        )}
      </Formik>
    </SignupContainer>
  );
};

export default Signup;
