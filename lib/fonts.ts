import {
  Inter,
  Roboto,
  Lato,
  Poppins,
  Montserrat,
  Open_Sans,
  Raleway,
  Playfair_Display,
  Merriweather,
  Oswald,
  Quicksand,
  Nunito,
  Roboto_Slab,
  Roboto_Mono,
  Fira_Sans,
  Mulish,
  Work_Sans,
  DM_Sans,
  Bitter,
} from "next/font/google";

// Display/heading fonts
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["600", "700"], subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["600", "700"], subsets: ["latin"] });
const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "700"] });
const raleway = Raleway({ weight: ["600", "700"], subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["500", "700"] });
const bitter = Bitter({ subsets: ["latin"], weight: ["500", "700"] });

// Body fonts
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });
const lato = Lato({ weight: ["400"], subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400"] });
const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["400"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"] });
const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400"] });
const mulish = Mulish({ subsets: ["latin"], weight: ["400"] });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400"] });

// Create a mapping of display names to normalized keys
const fontNameMap = {
  // Display fonts
  Inter: "inter",
  Poppins: "poppins",
  Montserrat: "montserrat",
  "Playfair Display": "playfairDisplay",
  Oswald: "oswald",
  Raleway: "raleway",
  "DM Sans": "dmSans",
  Bitter: "bitter",
  // Body fonts
  Roboto: "roboto",
  Lato: "lato",
  "Open Sans": "openSans",
  Merriweather: "merriweather",
  Quicksand: "quicksand",
  Nunito: "nunito",
  "Roboto Slab": "robotoSlab",
  "Roboto Mono": "robotoMono",
  "Fira Sans": "firaSans",
  Mulish: "mulish",
  "Work Sans": "workSans",
} as const;

// Group fonts for easier access
const fonts = {
  display: {
    inter,
    poppins,
    montserrat,
    playfairDisplay,
    oswald,
    raleway,
    dmSans,
    bitter,
  },
  body: {
    roboto,
    lato,
    openSans,
    merriweather,
    quicksand,
    nunito,
    robotoSlab,
    robotoMono,
    firaSans,
    mulish,
    workSans,
  },
};

// Font combinations that work well together
export const fontPairings = [
  { headerFont: "Montserrat", bodyFont: "Open Sans" },
  { headerFont: "Playfair Display", bodyFont: "Lato" },
  { headerFont: "Oswald", bodyFont: "Open Sans" },
  { headerFont: "Poppins", bodyFont: "Roboto" },
  { headerFont: "Inter", bodyFont: "Roboto Slab" },
  { headerFont: "DM Sans", bodyFont: "Merriweather" },
  { headerFont: "Raleway", bodyFont: "Roboto" },
  { headerFont: "Bitter", bodyFont: "Nunito" },
  { headerFont: "Montserrat", bodyFont: "Fira Sans" },
  { headerFont: "Playfair Display", bodyFont: "Work Sans" },
  { headerFont: "Oswald", bodyFont: "Mulish" },
  { headerFont: "Poppins", bodyFont: "Quicksand" },
  // Add more combinations as needed
];

// Helper function to get font object by name
export function getFontByName(fontName: string) {
  console.log("Getting font for:", fontName);

  // Use the mapping to get the correct key
  const normalizedName = fontNameMap[fontName as keyof typeof fontNameMap];
  console.log("Normalized name:", normalizedName);

  if (!normalizedName) {
    console.warn(
      `Font name "${fontName}" not found in mapping, falling back to manual normalization`
    );
    // Fallback to the old normalization method
    const fallbackName = fontName.toLowerCase().replace(/\s+/g, "");
    console.log("Fallback normalized name:", fallbackName);

    // Check display fonts
    const displayFont =
      fonts.display[fallbackName as keyof typeof fonts.display];
    if (displayFont) {
      console.log("Found in display fonts");
      return displayFont;
    }

    // Check body fonts
    const bodyFont = fonts.body[fallbackName as keyof typeof fonts.body];
    if (bodyFont) {
      console.log("Found in body fonts");
      return bodyFont;
    }

    console.warn(`Font "${fontName}" not found, using Inter as fallback`);
    return fonts.display.inter;
  }

  // Try display fonts first
  const displayFont =
    fonts.display[normalizedName as keyof typeof fonts.display];
  if (displayFont) {
    console.log("Found in display fonts");
    return displayFont;
  }

  // Then try body fonts
  const bodyFont = fonts.body[normalizedName as keyof typeof fonts.body];
  if (bodyFont) {
    console.log("Found in body fonts");
    return bodyFont;
  }

  console.warn(
    `Mapped font "${normalizedName}" not found, using Inter as fallback`
  );
  return fonts.display.inter;
}

export default fonts;
