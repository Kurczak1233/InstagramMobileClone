import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  Button,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";

import { RootStackParamList } from "../components/Navigation/RootStackParamList";

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().required(),
});

export type IRegisterForm = {
  login: string;
  password: string;
  confirmPassword: string;
};

export const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = (data: IRegisterForm) => {
    //Jeśli success to przekeruj na login z powrotem.
    console.log("form submitted", data);
  };


  useEffect(() => {
    ref_input2.current?.focus();
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View>
          <Controller
            control={control}
            name="login"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textInput}
                ref={ref_input2}
                value={value}
                onSubmitEditing={() => {
                  if (ref_input3.current) {
                    ref_input3.current.focus();
                  }
                }}
                autoCapitalize="words"
                autoComplete="off"
                autoCorrect={false}
                onChangeText={onChange}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder="Email"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textInput}
                ref={ref_input3}
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                placeholder="Password"
                secureTextEntry
              />
            )}
          />
          {errors.login && <Text>{errors.login.message}</Text>}
          {errors.password && <Text>{errors.password.message}</Text>}
          <TouchableOpacity>
            <Button title="Register" onPress={handleSubmit(submitForm)} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
});
