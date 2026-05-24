"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "@/app/login/page.module.css";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { createClient } from "@/lib/supabase/client";

type LoginMode = "magic" | "password";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<LoginMode>("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [keepConnected, setKeepConnected] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(false);

  async function finishLogin() {
    setIsCheckingSession(true);
    router.push("/dashboard");
    router.refresh();
  }

  useEffect(() => {
    if (!isCheckingSession) return;

    const timeout = window.setTimeout(() => {
      setIsCheckingSession(false);
      setError(
        "Sua sessao nao foi reconhecida a tempo. Tente entrar novamente pela aba de senha.",
      );
    }, 6000);

    return () => window.clearTimeout(timeout);
  }, [isCheckingSession]);

  async function handleRequestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    setIsLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setStep("verify");
    setSuccess(
      "Codigo enviado para o seu e-mail. No Supabase, o template de login deve usar {{ .Token }} para esse fluxo funcionar igual ao da Cakto.",
    );
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    let verifyError: string | null = null;

    const emailAttempt = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (emailAttempt.error) {
      const signupAttempt = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "signup",
      });

      if (signupAttempt.error) {
        verifyError = signupAttempt.error.message;
      }
    }

    setIsLoading(false);

    if (verifyError) {
      setError(verifyError);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function submitPasswordAuth(intent: "signin" | "signup" = "signin") {
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (email.toLowerCase() === DEV_LOGIN.email && password === DEV_LOGIN.password) {
      const response = await fetch("/api/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      setIsLoading(false);

      if (!response.ok) {
        setError("Nao foi possivel abrir o acesso de desenvolvimento.");
        return;
      }

      setSuccess("Acesso liberado para desenvolvimento.");
      await finishLogin();
      return;
    }

    if (intent === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      setIsLoading(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        setSuccess("Conta criada e acesso liberado.");
        await finishLogin();
        return;
      }

      setSuccess(
        "Conta criada. Se o Supabase estiver exigindo confirmacao por e-mail, confirme a conta no e-mail recebido antes de entrar.",
      );
      return;
    }

    const { error: passwordError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!passwordError) {
      setIsLoading(false);
      if (keepConnected) {
        setSuccess("Sessao iniciada com sucesso.");
      }
      await finishLogin();
      return;
    }

    const shouldTrySignup =
      passwordError.message.toLowerCase().includes("invalid login credentials") ||
      passwordError.message.toLowerCase().includes("email not confirmed") ||
      passwordError.message.toLowerCase().includes("user not found");

    if (!shouldTrySignup) {
      setIsLoading(false);
      setError(passwordError.message);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (signUpData.session) {
      setSuccess("Conta criada e acesso liberado.");
      await finishLogin();
      return;
    }

    setSuccess(
      "Conta criada, mas o Supabase ainda nao abriu a sessao automaticamente. Tente clicar em 'Entrar com senha' agora com o mesmo e-mail e senha.",
    );
  }

  return (
    <>
      <div className={styles.tabs}>
        <button
          type="button"
          className={mode === "magic" ? styles.tabActive : styles.tab}
          onClick={() => {
            setMode("magic");
            setStep("request");
            setError("");
            setSuccess("");
          }}
        >
          Login sem senha
        </button>
        <button
          type="button"
          className={mode === "password" ? styles.tabActive : styles.tab}
          onClick={() => {
            setMode("password");
            setError("");
            setSuccess("");
          }}
        >
          Login com senha
        </button>
      </div>

      {mode === "magic" && step === "request" ? (
        <form className={styles.form} onSubmit={handleRequestCode}>
          <label className={styles.field}>
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu e-mail para entrar na plataforma"
              required
            />
          </label>

          <label className={styles.keepRow}>
            <input
              type="checkbox"
              checked={keepConnected}
              onChange={(event) => setKeepConnected(event.target.checked)}
            />
            <span>
              <strong>Manter conexao</strong>
              <small>Se voce marcar esta opcao, seu login sera mantido ate que faca logout.</small>
            </span>
          </label>

          {success ? <p className={styles.successText}>{success}</p> : null}
          {error ? <p className={styles.errorText}>{error}</p> : null}
          {isCheckingSession ? (
            <p className={styles.successText}>Abrindo sua area de membros...</p>
          ) : null}

          <button className={styles.primaryButton} type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Codigo de Acesso"}
          </button>
        </form>
      ) : null}

      {mode === "magic" && step === "verify" ? (
        <form className={styles.form} onSubmit={handleVerifyCode}>
          <label className={styles.field}>
            <span>Codigo de acesso</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
              placeholder="Digite o codigo de 6 digitos"
              required
            />
          </label>

          <label className={styles.keepRow}>
            <input
              type="checkbox"
              checked={keepConnected}
              onChange={(event) => setKeepConnected(event.target.checked)}
            />
            <span>
              <strong>Manter conexao</strong>
              <small>Seu acesso permanece ativo por mais tempo neste dispositivo.</small>
            </span>
          </label>

          {success ? <p className={styles.successText}>{success}</p> : null}
          {error ? <p className={styles.errorText}>{error}</p> : null}
          {isCheckingSession ? (
            <p className={styles.successText}>Abrindo sua area de membros...</p>
          ) : null}

          <div className={styles.inlineActions}>
            <button className={styles.primaryButton} type="submit" disabled={isLoading}>
              {isLoading ? "Validando..." : "Confirmar Codigo"}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                setStep("request");
                setCode("");
                setError("");
              }}
            >
              Voltar
            </button>
          </div>
        </form>
      ) : null}

      {mode === "password" ? (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            void submitPasswordAuth("signin");
          }}
        >
          <label className={styles.field}>
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={DEV_LOGIN.email}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={DEV_LOGIN.password}
              required
            />
          </label>

          <label className={styles.keepRow}>
            <input
              type="checkbox"
              checked={keepConnected}
              onChange={(event) => setKeepConnected(event.target.checked)}
            />
            <span>
              <strong>Manter conexao</strong>
              <small>Use esta opcao para manter a sessao ativa neste dispositivo. Acesso dev pronto para teste.</small>
            </span>
          </label>

          {success ? <p className={styles.successText}>{success}</p> : null}
          {error ? <p className={styles.errorText}>{error}</p> : null}
          {isCheckingSession ? (
            <p className={styles.successText}>Abrindo sua area de membros...</p>
          ) : null}

          <div className={styles.inlineActions}>
            <button className={styles.primaryButton} type="submit" disabled={isLoading}>
              {isLoading ? "Processando..." : "Entrar com senha"}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={isLoading}
              onClick={() => void submitPasswordAuth("signup")}
            >
              Criar acesso
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
}
