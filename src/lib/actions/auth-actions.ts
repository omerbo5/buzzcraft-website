'use server';

import { createUser } from "../auth/user";
import { z } from "zod";
import { redirect } from "next/navigation";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  })
});

export async function signUp(formData: FormData) {
  // Parse and validate the form data
  const validatedFields = signupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    termsAccepted: formData.get("termsAccepted") === "on"
  });

  if (!validatedFields.success) {
    return { 
      success: false, 
      errors: validatedFields.error.flatten().fieldErrors 
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    await createUser({
      firstName,
      lastName,
      email,
      password
    });

    // Redirect to login page after successful signup
    return { success: true };
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage.includes('already exists')) {
      return { 
        success: false, 
        errors: { 
          email: ["User with this email already exists"]
        } 
      };
    }
    
    return { 
      success: false, 
      errors: { 
        form: [(error as Error).message]
      } 
    };
  }
}
