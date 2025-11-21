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
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/ui/hover-card";
import { Info, Copy, Check } from "lucide-react";

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
  const [copiedSanscript, setCopiedSanscript] = useState(false);

  const handleCopy = async (text: string, setCopied: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center py-4 md:py-8 px-4">
        <div className="w-full max-w-5xl mx-auto md:space-y-6 space-y-4">
          {/* Mode Switcher Card */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                  Transliteration Mode
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {isTransliterateMode
                    ? "Using Google Input Tools for real-time transliteration"
                    : "Using Sanscript for script conversion"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs md:text-sm font-medium ${!isTransliterateMode ? 'text-gray-900' : 'text-gray-500'}`}>
                    Sanscript
                  </span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="inline-flex items-center justify-center">
                        <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Sanscript</h4>
                        <p className="text-xs text-gray-600">
                          A powerful transliteration library that converts text between different Indic scripts and romanization schemes (ITRANS, IAST, Harvard-Kyoto, etc.). Perfect for converting between Devanagari, Tamil, Telugu, and other scripts.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <Switch
                  id="mode-switch"
                  checked={isTransliterateMode}
                  onCheckedChange={setIsTransliterateMode}
                />
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs md:text-sm font-medium ${isTransliterateMode ? 'text-gray-900' : 'text-gray-500'}`}>
                    Google Input
                  </span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="inline-flex items-center justify-center">
                        <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Google Input Tools</h4>
                        <p className="text-xs text-gray-600">
                          Real-time transliteration as you type in Roman script. Type phonetically in English and get instant suggestions in your chosen Indic language. Supports Hindi, Sanskrit, Tamil, Telugu, and many more languages.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            {isTransliterateMode ? (
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Language Selector */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <Label className="text-sm md:text-base font-semibold text-gray-900">
                    Select Language
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setTransliterationLang(value as LanguageCode)
                    }
                    value={transliterationLang}
                  >
                    <SelectTrigger className="w-full max-w-xs">
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
                </div>

                {/* Input Area */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <Transliterate lang={transliterationLang} />
                  <p className="text-[10px] md:text-xs text-gray-500 mt-1">
                    Start typing in Roman script and select from suggestions
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Script Selectors */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2 md:gap-3">
                    <Label className="text-sm md:text-base font-semibold text-gray-900">
                      From (Input Script)
                    </Label>
                    <Select
                      onValueChange={(e) => setInputScript(e)}
                      value={inputScript}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose Script" />
                      </SelectTrigger>
                      <SelectContent>
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
                  <div className="flex flex-col gap-2 md:gap-3">
                    <Label className="text-sm md:text-base font-semibold text-gray-900">
                      To (Output Script)
                    </Label>
                    <Select
                      onValueChange={(e) => setOutputScript(e)}
                      value={outputScript}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose Script" />
                      </SelectTrigger>
                      <SelectContent>
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

                {/* Input Textarea */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <Label className="text-sm md:text-base font-semibold text-gray-900">
                    Input Text
                  </Label>
                  <Textarea
                    value={sanscriptInput}
                    onChange={(e) => setSanscriptInput(e.target.value)}
                    placeholder={`Enter text in ${scripts[inputScript]}...`}
                    className="min-h-[180px] text-sm md:text-base resize-none"
                  />
                </div>

                {/* Output Area */}
                {sanscriptInput && (
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm md:text-base font-semibold text-gray-900">
                        Output Text
                      </Label>
                      <button
                        onClick={() => handleCopy(Sanscript.t(sanscriptInput, inputScript, outputScript), setCopiedSanscript)}
                        className="inline-flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedSanscript ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[180px]">
                      <p className="text-sm md:text-base text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {Sanscript.t(sanscriptInput, inputScript, outputScript)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
