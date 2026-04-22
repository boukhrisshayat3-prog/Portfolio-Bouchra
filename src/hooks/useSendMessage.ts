import { useState } from "react";

type MessageData = {
  name: string;
  email: string;
  message: string;
};

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: MessageData) => {
    try {
      setLoading(true);
      setSuccess(null);
      setError(null);

      const response = await fetch(
        "https://ap-ihealen-journy.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess("Message sent successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, success, error };
};