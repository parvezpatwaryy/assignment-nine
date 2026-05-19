"use client";

import { toast } from "react-toastify";
import { Button, Description, FieldError, Form, Input, Label, TextField, Card, Separator } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Logged in successfully! 🔑");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }

      if (error) {
        toast.error(error.message || "Something went wrong. Please try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed!");
    }
  };

  const handleGoogleRegistration = async () => {
    await authClient.signIn.social({
      provider: "google"
    })
  }

  return (
    <div className="max-w-7xl mx-auto m-5 flex flex-col items-center justify-center min-h-[85vh]">
      <h2 className="text-center m-4 text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
      <Card className="border p-6 shadow-lg bg-white dark:bg-zinc-900 rounded-2xl">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium">Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError className="text-xs text-red-500" />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium">Password</Label>
            <Input placeholder="Enter your password" />
            <Description className="text-xs text-gray-500">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-500" />
          </TextField>
          <div className="flex gap-2 mt-2">
            <Button className="w-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors py-2.5 rounded-xl shadow-md" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <div className="flex justify-center items-center gap-3">
          <Separator />
          <div className="whitespace-nowrap font-bold">or</div>
          <Separator />
        </div>
        <div>
          <Button onClick={handleGoogleRegistration} variant="outline" className={'w-full'}><FcGoogle />Login with Google</Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;