import { useEffect, useState } from "react";
import type { ContactInfo } from "../schemas/contactInfoShema";

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://ap-ihealen-journy.vercel.app/api/contactinfo"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contact info");
        }

        const data = await response.json();

        setContactInfo(Array.isArray(data) ? data : data ? [data] : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading, error };
};