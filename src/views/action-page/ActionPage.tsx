import React from "react";

import styles from "./ActionPage.module.css";
import TextView from "./text-view/TextView";

export interface ActionPageDataType {}

interface ActionPageProps {}

const getPublishVersion = async () => "v1.0.0";

export default async function ActionPage(props: ActionPageProps) {
  const publishVersion = await getPublishVersion();

  const getText = async () => {
    "use server";

    if (publishVersion !== (await getPublishVersion()))
      return "Invalid version";

    return "Hello, world!";
  };

  return (
    <div className={styles["root"]}>
      <TextView actionFn={getText} />
    </div>
  );
}
