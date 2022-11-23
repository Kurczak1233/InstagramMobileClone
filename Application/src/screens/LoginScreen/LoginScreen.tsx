import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Button,
  Keyboard,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";

import { RootStackParamList } from "../../components/Navigation/RootStackParamList";
import { Error } from "../../components/typography/Error/Error";
import { appStateContext } from "../../contexts/AppStateContextProvider";
import { convertEpochToSpecificTimezone } from "../../helpers/convertEpochToSpecificTimezone";
import { saveSecuredItem } from "../../utilities/secureStorage";
import { setItem } from "../../utilities/storage";
import { supaBaseclient } from "../../utilities/supabaseClient";
import { styles } from "./styles";
const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().required(),
});

type ILoginForm = {
  login: string;
  password: string;
};

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const ref_email_input = useRef<TextInput>(null);
  const ref_password_input = useRef<TextInput>(null);

  const { setIsLoggedInMethod } = useContext(appStateContext);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = async (data: ILoginForm) => {
    try {
      const response = await supaBaseclient.auth.signInWithPassword({
        email: data.login,
        password: data.password,
      });
      if (response.data && response.data.session?.access_token) {
        if (response.data && response.data.session.expires_at) {
          const expireDate = convertEpochToSpecificTimezone(
            response.data.session.expires_at * 1000
          );
          if (expireDate) {
            saveSecuredItem("accees_token", response.data.session.access_token);
            setItem("userId", response.data.user?.id);
            setItem("tokenExpiresIn", expireDate.getTime().toString());
            setIsLoggedInMethod();
          }
          return;
        }
      }
      setError("password", {
        type: "custom",
        message: "Logging attempt unsuccessful",
      });
    } catch (error) {
      console.log("Login went wrong", error);
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
              value={value}
              onChangeText={onChange}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(submitForm)}
              placeholder="Password"
              secureTextEntry
            />
          )}
        />
        {errors.login && <Error variant="small">{errors.login.message}</Error>}
        {errors.password && (
          <Error variant="small">{errors.password.message}</Error>
        )}
        <TouchableOpacity style={styles.buttons}>
          <View style={styles.loginButton}>
            <Button title="Login" onPress={handleSubmit(submitForm)} />
          </View>
          <Button
            title="Sign up"
            onPress={() => navigation.navigate("Register")}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
