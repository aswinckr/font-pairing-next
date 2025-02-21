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
  // Normalize font name to match object keys
  const normalizedName = fontName.toLowerCase().replace(/\s+/g, "");

  // Check display fonts
  const displayFont =
    fonts.display[normalizedName as keyof typeof fonts.display];
  if (displayFont) return displayFont;

  // Check body fonts
  const bodyFont = fonts.body[normalizedName as keyof typeof fonts.body];
  if (bodyFont) return bodyFont;

  // Return Inter as fallback
  return fonts.display.inter;
}

export default fonts;
