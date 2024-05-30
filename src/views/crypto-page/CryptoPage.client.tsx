"use client";

import React, { useState } from "react";
import { TextField, Button, Input } from "@mui/material";
import { crypto } from "./crypto";

const styleResult = (data: string) => {
  return data.replace(/{/g, "{\n\t").replace(/,/g, ",\n\t").replace(/}/g, "\n}");
};

const CryptoPageClient: React.FC = () => {
  const [formData, setFormData] = useState({ password: "", key: "", value: "", decoded: "", encoded: "", file: "" });
  const [data, setData] = useState<{ [K: string]: string } | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = atob(atob((e.target?.result as string).split(",")[1]));
        fileData && setFormData({ ...formData, file: e.target?.result as string, encoded: fileData, decoded: styleResult(crypto.decrypt(fileData, formData.password)) });
        setData(JSON.parse(crypto.decrypt(fileData, formData.password)));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const mutate = () => {
    const tempData = data || {};
    if (formData.password && formData.key && formData.value) {
      tempData[formData.key] = formData.value;
      let sorted: { [K: string]: string } = {};
      Object.keys(tempData)
        .sort()
        .forEach((key) => {
          sorted[key] = tempData[key];
        });
      const encoded = crypto.encrypt(JSON.stringify(sorted), formData.password);
      const decoded = styleResult(crypto.decrypt(encoded, formData.password));
      setFormData({ ...formData, encoded: encoded, decoded: decoded });
      setData(sorted);
    }
  };

  const remove = () => {
    const tempData = data || {};
    if (formData.password && formData.key) {
      delete tempData[formData.key];
      const encoded = crypto.encrypt(JSON.stringify(tempData), formData.password);
      const decoded = styleResult(crypto.decrypt(encoded, formData.password));
      setFormData({ ...formData, encoded: encoded, decoded: decoded });
      setData(tempData);
    }
  };

  const saveToFile = () => {
    const blob = new Blob([btoa(formData.encoded)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.txt";
    a.click();
  };

  return (
    <div>
      <form noValidate autoComplete="off" className="flex flex-col gap-2 min-w-[1280px]">
        <div className="flex gap-2">
          <Input className=" flex-auto" id="fileName" type="file" onChange={onFileChange} />
        </div>
        <TextField id="password" name="password" label="Password" variant="outlined" onChange={handleInputChange} />
        <div className="flex gap-2 w-full">
          <TextField className=" flex-auto" id="key" name="key" label="Key" variant="outlined" onChange={handleInputChange} />
          <TextField className=" flex-auto" id="value" name="value" label="Value" variant="outlined" onChange={handleInputChange} />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="contained" className=" bg-green-500" onClick={() => mutate()}>
            Mutate
          </Button>
          <Button variant="contained" className=" bg-red-600" onClick={() => remove()}>
            Remove
          </Button>
          <Button variant="contained" className=" bg-blue-600" onClick={() => saveToFile()}>
            Save
          </Button>
          <Button variant="contained" className=" bg-yellow-600" onClick={() => saveToFile()}>
            Reload
          </Button>
        </div>
        <TextField id="file" variant="outlined" multiline rows={5} InputProps={{ readOnly: true }} value={formData.file} />
        <TextField id="encoded" variant="outlined" multiline rows={5} InputProps={{ readOnly: true }} value={formData.encoded} />
        <TextField id="decoded" variant="outlined" multiline rows={10} InputProps={{ readOnly: true }} value={formData.decoded} />
      </form>
    </div>
  );
};

export default CryptoPageClient;
