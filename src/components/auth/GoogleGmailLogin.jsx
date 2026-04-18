import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";

const GOOGLE_SCRIPT_ID = "google-identity-services";
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

let googleScriptPromise = null;

function loadGoogleScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Không thể tải Google Identity script.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Không thể tải Google Identity script."));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export default function GoogleGmailLogin({ onCredential, disabled = false }) {
  const googleButtonRef = useRef(null);
  const onCredentialRef = useRef(onCredential);
  const disabledRef = useRef(disabled);
  const [ready, setReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    let mounted = true;

    async function initializeGoogleSignIn() {
      if (!GOOGLE_CLIENT_ID) {
        setReady(false);
        setErrorMessage(
          "Thiếu VITE_GOOGLE_CLIENT_ID. Vui lòng cấu hình để bật đăng nhập Gmail.",
        );
        return;
      }

      try {
        await loadGoogleScript();

        if (!mounted || !window.google?.accounts?.id) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            if (!response?.credential || disabledRef.current) {
              return;
            }

            try {
              await onCredentialRef.current(response.credential);
              setErrorMessage("");
            } catch (error) {
              setErrorMessage(
                error?.message || "Đăng nhập Gmail thất bại. Vui lòng thử lại.",
              );
            }
          },
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: true,
          auto_select: false,
        });

        if (googleButtonRef.current) {
          googleButtonRef.current.innerHTML = "";
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            shape: "pill",
            text: "continue_with",
            logo_alignment: "left",
            width: 220,
          });
        }

        setReady(true);
        setErrorMessage("");
      } catch (error) {
        if (!mounted) {
          return;
        }

        setReady(false);
        setErrorMessage(
          error?.message || "Không thể tải đăng nhập Gmail. Vui lòng thử lại.",
        );
      }
    }

    void initializeGoogleSignIn();

    return () => {
      mounted = false;
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  const handlePromptOneTap = () => {
    if (!window.google?.accounts?.id) {
      setErrorMessage("Google One Tap chưa sẵn sàng.");
      return;
    }

    window.google.accounts.id.prompt();
  };

  return (
    <div className="space-y-1.5 rounded-2xl border border-gray-200 bg-gray-50/70 px-3 py-2.5">
      <div className="flex items-center justify-center gap-2">
        <div
          ref={googleButtonRef}
          className={`${disabled ? "pointer-events-none opacity-60" : ""}`}
        />
        <button
          type="button"
          disabled={disabled || !ready}
          onClick={handlePromptOneTap}
          className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[11px] font-medium text-emerald-700 transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Mail size={13} />
          Dùng One Tap
        </button>
      </div>

      {errorMessage ? (
        <p className="text-center text-[10px] text-amber-700">{errorMessage}</p>
      ) : null}
    </div>
  );
}
