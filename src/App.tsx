import { useState } from "react";
import "./App.css";
import { Transliterate } from "./components/Transliterate";
import Sanscript from "@indic-transliteration/sanscript";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import { Textarea } from "./components/ui/textarea";
import { type LanguageCode } from "./transliterate/core";

const scripts: {
  [key: string]: string;
} = {
  itrans: "ITRANS",
  devanagari: "Devanagari",
  iast: "IAST",
  hk: "Harvard-Kyoto",
  slp1: "SLP1",
  velthuis: "Velthuis",
  wx: "WX",
  kannada: "Kannada",
  malayalam: "Malayalam",
  tamil: "Tamil",
  telugu: "Telugu",
  bengali: "Bengali",
  gurmukhi: "Gurmukhi",
  gujarati: "Gujarati",
  oriya: "Oriya",
};

const languageMap: Record<LanguageCode, string> = {
  am: "Amharic",
  ar: "Arabic",
  bn: "Bengali",
  el: "Greek",
  gu: "Gujarati",
  hi: "Hindi",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  ne: "Nepali",
  or: "Oriya",
  fa: "Persian",
  pa: "Punjabi",
  ru: "Russian",
  sa: "Sanskrit",
  si: "Sinhala",
  sr: "Serbian",
  ta: "Tamil",
  te: "Telugu",
  ti: "Tigrinya",
  ur: "Urdu",
};

function App() {
  const [isTransliterateMode, setIsTransliterateMode] = useState(true);
  const [inputScript, setInputScript] = useState<string>("itrans");
  const [outputScript, setOutputScript] = useState<string>("devanagari");
  const [sanscriptInput, setSanscriptInput] = useState("");
  const [transliterationLang, setTransliterationLang] =
    useState<LanguageCode>("sa");

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mx-auto p-8 bg-white/80 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center mb-2 text-gradient">
          Indic Transliteration Tool
        </h1>
        <p className="text-center text-sm mb-8">
          Using Google Input Tools or Indic Transliterate
        </p>

        <div className="flex items-center justify-center space-x-2 mb-8">
          <Label htmlFor="mode-switch" className="text-lg">
            {isTransliterateMode ? "Google Input Tools" : "Sanscript"}
          </Label>
          <Switch
            id="mode-switch"
            checked={isTransliterateMode}
            onCheckedChange={setIsTransliterateMode}
          />
        </div>

        {isTransliterateMode ? (
          <div className="flex flex-col gap-4 items-center">
            <Select
              onValueChange={(value) =>
                setTransliterationLang(value as LanguageCode)
              }
              value={transliterationLang}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {Object.entries(languageMap).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Transliterate lang={transliterationLang} />
          </div>
        ) : (
          <div className="w-full overflow-y-auto max-h-[calc(100vh-250px)]">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Input Script</Label>
                  <Select
                    onValueChange={(e) => setInputScript(e)}
                    value={inputScript}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose Script" />
                    </SelectTrigger>
                    <SelectContent id="select-order">
                      <SelectGroup>
                        <SelectLabel>Input Script</SelectLabel>
                        {Object.keys(scripts).map((key) => (
                          <SelectItem key={key} value={key}>
                            {scripts[key]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Output Script</Label>
                  <Select
                    onValueChange={(e) => setOutputScript(e)}
                    value={outputScript}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose Script" />
                    </SelectTrigger>
                    <SelectContent id="select-order">
                      <SelectGroup>
                        <SelectLabel>Output Script</SelectLabel>
                        {Object.keys(scripts).map((key) => (
                          <SelectItem key={key} value={key}>
                            {scripts[key]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Textarea
                value={sanscriptInput}
                onChange={(e) => setSanscriptInput(e.target.value)}
                placeholder="Enter text to transliterate..."
                className="min-h-[200px] text-lg"
              />
              <div>
                {sanscriptInput && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    {/* <h3 className="text-lg font-semibold mb-2">Output:</h3> */}
                    <p className="text-lg overflow-auto scroll-auto">
                      {Sanscript.t(sanscriptInput, inputScript, outputScript)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-center text-white">
        <p>Made with ❤️ by Keshav</p>
      </footer>
    </div>
  );
}

export default App;
