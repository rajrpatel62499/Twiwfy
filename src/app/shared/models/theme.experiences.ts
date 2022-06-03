export interface ThemeExperience {
  _id: string;
  themeCategory: string;
  data: HomeThemeExperience[];
}


export interface HomeThemeExperience {
  primaryTheme?: any;
  _id: string;
  image?: string;
  individualRate?: number;
  title?: any;
  location?: string;
}