import React from "react";

import CryptoPageClient from "./CryptoPage.client";

export interface CryptoPageDataType {}

interface CryptoPageProps {}

export default function CryptoPage(props: CryptoPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white justify-between p-24">
      <CryptoPageClient />
    </div>
  );
}
