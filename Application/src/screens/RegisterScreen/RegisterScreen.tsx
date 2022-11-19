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

import { RootStackParamList } from "../../components/Navigation/RootStackParamList";
import { supaBaseclient } from "../../utilities/supabaseClient";

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(32)
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

type IRegisterForm = {
  login: string;
  password: string;
  confirmPassword: string;
};

export const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const ref_email_input = useRef<TextInput>(null);
  const ref_password_input = useRef<TextInput>(null);
  const ref_confirm_password_input = useRef<TextInput>(null);

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

  const submitForm = async (data: IRegisterForm) => {
    try {
      const response = await supaBaseclient.auth.signUp({
        email: data.login,
        password: data.password,
      });
      if (response.data && response.data.session?.access_token) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Register went wrong", error);
    }
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
        <View style={styles.scrollView}>
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
                keyboardType="email-address"
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
                onSubmitEditing={() => {
                  if (ref_confirm_password_input.current) {
                    ref_confirm_password_input.current.focus();
                  }
                }}
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                placeholder="Password"
                secureTextEntry
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textInput}
                ref={ref_confirm_password_input}
                value={value}
                onSubmitEditing={handleSubmit(submitForm)}
                onChangeText={onChange}
                returnKeyType="done"
                placeholder="Confirm password"
                secureTextEntry
              />
            )}
          />
          {errors.login && <Text>{errors.login.message}</Text>}
          {errors.password && <Text>{errors.password.message}</Text>}
          {errors.confirmPassword && (
            <Text>{errors.confirmPassword.message}</Text>
          )}
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
  scrollView: {
    paddingHorizontal: 20,
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
});
