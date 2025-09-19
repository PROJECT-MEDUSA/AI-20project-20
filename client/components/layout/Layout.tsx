import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ChatAssistant from "@/components/chat/Assistant";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import React from "react";

export default function Layout() {
  const location = useLocation();

  // Default configurable timings via CSS variables
  const transitionVars: React.CSSProperties = {
    // You can override these per route if needed
    ["--routefade-enter-duration" as any]: "800ms",
    ["--routefade-exit-duration" as any]: "400ms",
    ["--routefade-distance" as any]: "12px",
  };

  return (
    <div className="min-h-screen flex flex-col dark bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-white px-3 py-1 rounded"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            classNames="routefade"
            timeout={{ appear: 800, enter: 800, exit: 400 }}
            appear
            unmountOnExit
          >
            <div style={transitionVars}>
              <Outlet />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </main>
      <SiteFooter />
      <ChatAssistant />
    </div>
  );
}