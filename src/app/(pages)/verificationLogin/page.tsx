"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../_providers/Auth";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const { login } = useAuth();
  const router = useRouter(); // Use router for redirection
  const searchParam = useSearchParams();
  const [decode, setDecode] = useState(null);

  useEffect(() => {
    const fetchDecodedData = async () => {
      try {
        const token = searchParam.get("token");
        if (!token) {
          setDecode({ error: "Token is missing from URL." });
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/decodedData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setDecode(data);

        const dataFurther = {
          name: data.name,
          email: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        };

        if (data) {
          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/`,
            {
              method: "POST",
              body: JSON.stringify(dataFurther),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!userResponse.ok) {
            throw new Error("User registration failed");
          }

          await login(dataFurther); // Ensure login happens before redirecting

          // Use router.push instead of redirect
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching decoded data:", error);
        setDecode({ error: error.message });
      }
    };

    fetchDecodedData();
  }, [searchParam, router, login]); // Added router and login to dependencies

  return (
    <div>
      {/* <h1>Decoded Data</h1>
      <pre>{JSON.stringify(decode, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
