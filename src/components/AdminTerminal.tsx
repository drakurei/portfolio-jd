"use client";

import { useEffect, useRef, useState } from "react";
import { loadCv, saveCv } from "@/lib/admin-store";
import type { CvData } from "@/lib/types";

interface OutLine {
  kind: "in" | "out" | "ok" | "err";
  text: string;
}

const HELP = [
  "Commandes disponibles :",
  "  help                      — cette aide",
  "  cv.show                   — affiche les infos actuelles",
  '  cv.set <champ> "valeur"   — champs: title, tagline, phone, email, address, linkedin',
  "  push                      — déploie les modifications (sauvegarde)",
  "  clear                     — efface l'écran",
];

export default function AdminTerminal() {
  const [cv, setCv] = useState<CvData | null>(null);
  const [lines, setLines] = useState<OutLine[]>([
    { kind: "out", text: "jonathan@davy:~/cv$ — tapez 'help' pour les commandes." },
  ]);
  const [input, setInput] = useState("");
  const [dirty, setDirty] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setCv(loadCv()), []);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const print = (kind: OutLine["kind"], text: string) =>
    setLines((l) => [...l, { kind, text }]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    print("in", `$ ${cmd}`);
    if (!cv) return;

    if (cmd === "help") {
      HELP.forEach((h) => print("out", h));
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "cv.show") {
      print("out", `title    : ${cv.identity.title}`);
      print("out", `tagline  : ${cv.identity.tagline}`);
      print("out", `phone    : ${cv.contact.phone}`);
      print("out", `email    : ${cv.contact.email}`);
      print("out", `address  : ${cv.contact.address}`);
      print("out", `linkedin : ${cv.contact.linkedin}`);
    } else if (cmd === "push") {
      saveCv(cv);
      setDirty(false);
      print("ok", "✓ déployé — modifications sauvegardées (revalidate).");
    } else {
      const m = cmd.match(/^cv\.set\s+(title|tagline|phone|email|address|linkedin)\s+"(.*)"$/);
      if (m) {
        const [, field, value] = m;
        const next = structuredClone(cv);
        if (field === "title") next.identity.title = value;
        else if (field === "tagline") next.identity.tagline = value;
        else if (field === "phone") next.contact.phone = value;
        else if (field === "email") next.contact.email = value;
        else if (field === "address") next.contact.address = value;
        else if (field === "linkedin") next.contact.linkedin = value;
        setCv(next);
        setDirty(true);
        print("ok", `→ ${field} = "${value}"  (non déployé, tapez 'push')`);
      } else {
        print("err", `commande inconnue : ${cmd} — tapez 'help'`);
      }
    }
  };

  const color = (k: OutLine["kind"]) =>
    k === "in"
      ? "text-indigo-bright"
      : k === "ok"
        ? "text-[#10b981]"
        : k === "err"
          ? "text-[#ef4444]"
          : "text-foreground/70";

  return (
    <div className="glass overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ec4899]" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <span className="ml-3 text-xs text-foreground/40">
          admin terminal {dirty && <span className="text-[#f59e0b]">● non déployé</span>}
        </span>
      </div>
      <div ref={scrollRef} className="h-72 space-y-1 overflow-y-auto p-5 leading-relaxed">
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap ${color(l.kind)}`}>
            {l.text}
          </p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
        className="flex items-center gap-2 border-t border-foreground/10 px-5 py-3"
      >
        <span className="text-indigo-bright">$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="flex-1 bg-transparent text-foreground/80 outline-none"
          placeholder='cv.set title "Architecte Full Stack"'
        />
      </form>
    </div>
  );
}
