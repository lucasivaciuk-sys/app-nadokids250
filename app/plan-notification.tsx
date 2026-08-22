"use client";

import { useEffect, useState } from "react";

const planMessages = [
  {
    title: "Plano Inicial",
    detail: "250 treinos de natação infantil",
    meta: "Acesso imediato",
  },
  {
    title: "Plano Completo",
    detail: "Treinos, videoaulas e 4 bônus",
    meta: "Pagamento único",
  },
  {
    title: "NadoKids 250",
    detail: "Acesso pelo celular e computador",
    meta: "Garantia de 7 dias",
  },
];

export default function PlanNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      window.setTimeout(() => setVisible(false), 6000);
    };

    const first = window.setTimeout(show, 3500);
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % planMessages.length);
      show();
    }, 15000);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  const message = planMessages[index];

  return (
    <aside
      className={visible ? "plan-toast is-visible" : "plan-toast"}
      aria-live="polite"
      aria-hidden={!visible}
    >
      <span className="plan-toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6.8 8.2h10.4l.8 11H6l.8-11Z" />
          <path d="M9.2 9V6.8a2.8 2.8 0 0 1 5.6 0V9" />
        </svg>
      </span>
      <span className="plan-toast-copy">
        <strong>{message.title}</strong>
        <span>{message.detail}</span>
        <small>{message.meta}</small>
      </span>
    </aside>
  );
}
