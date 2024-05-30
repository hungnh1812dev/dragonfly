"use client";
import React, { useEffect } from "react";

import styles from "./TextView.module.css";

export interface TextViewDataType {}

interface TextViewProps {
  actionFn: () => Promise<string>;
}

const TextView: React.FC<TextViewProps> = ({ actionFn }) => {
  const [text, setText] = React.useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setText(await actionFn());
    })();
  }, [actionFn]);
  return (
    <div className={styles["root"]}>
      {text}
      <button onClick={async () => setText(await actionFn())}>Refresh</button>
    </div>
  );
};

export default TextView;
