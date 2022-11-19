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
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";

import { RootStackParamList } from "../components/Navigation/RootStackParamList";

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

type ILoginForm = {
  login: string;
  password: string;
};

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const ref_email_input = useRef<TextInput>(null);
  const ref_password_input = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = (data: ILoginForm) => {
    console.log("form submitted", data);
  };

  useEffect(() => {
    ref_email_input.current?.focus();
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
                ref={ref_email_input}
                value={value}
                onSubmitEditing={() => {
                  if (ref_password_input.current) {
                    ref_password_input.current.focus();
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
                ref={ref_password_input}
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
            <Button title="Login" onPress={handleSubmit(submitForm)} />
            <Button
              title="Sign up"
              onPress={() => navigation.navigate("Register")}
            />
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
